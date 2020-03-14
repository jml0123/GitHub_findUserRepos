const handleFormSubmit = () => {
    document.querySelector("button[type='submit']")
      .addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".results-list").innerHTML = ""; 
        // Get Form Values
        const userToFind = document.getElementById("searchUserField").value;
        // Call a search on GitHub API to list this user's repos
        getUserRepos(userToFind); 
      })
  }
  
  const getUserRepos = async (userName) => {
    try {
        // Call the Endpoint
        let response = await fetch(`https://api.github.com/users/${userName}/repos`)
        userData = await response.json();
        if (!response.ok) {
            throw new Error(userData.message); 
          }
    }
    catch(error) {
        console.log(error);
        document.querySelector(".results-list").innerHTML += 
            `<div>
            <p>
            ${error}
            <br>Could not find the specified user.
            </p>
            </div>`;
            return;
        }

    console.log(userData)
    listUserRepos(userData)
}

const listUserRepos = (data) => {
    data.map(obj => {
        const name = obj.name;
        const link = obj.html_url;
        appendToList(name, link);
    })
}

const appendToList = (repoName, repoLink) => {
    document.querySelector(".results-list").innerHTML += `
    <li>
        <p class="results-name">${repoName}</p>
        <a class="results-link">${repoLink}</a>
    </li>
    `; 
}

const main = () => {
    handleFormSubmit();
}
  
main();
