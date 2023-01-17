const APIURL = 'https://api.github.com/users/'; // API URL    

const form = document.getElementById('form'); 
const search = document.getElementById('search'); // Get input

getUser("faheem4545")
async function getUser(username){
  try {
    const {data} = await axios(APIURL + username); // Get user data from API
    // console.log(data); // Log user data
    createUserCard(data); // Create user card
    getRepos(username); // Get user repos


  } catch (err) {
   
    if(err.response.status == 404) {
      createErrorCard('No profile with this username'); // Create error card
    }
  }
 
}

function createErrorCard(msg) {
  const cardHTML = `
    <div class="card">
      <h1>${msg}</h1>
    </div>
  `;
  main.innerHTML = cardHTML; // Add error card to main
}

async function getRepos(username) {
  try {
    const {data} = await axios(APIURL + username + '/repos'); // Get user repos from API
    addReposToCard(data); // Add repos to card
  } catch (err) {
    createErrorCard('Problem fetching repos'); // Create error card
  }
}


const main = document.getElementById('main'); // Get main element


function createUserCard(user) {
  const cardHTML = `
    <div class="card">
      <div>
        <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
      </div>
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
          <li>${user.followers} <strong>Followers</strong></li>
          <li>${user.following} <strong>Following</strong></li>
          <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
      </div>
    </div>
  `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos'); // Get repos element
  repos
  .forEach(repo => {
    const repoEl = document.createElement('a'); // Create repo element
    repoEl.classList.add('repo'); // Add repo class
    repoEl.href = repo.html_url; // Add repo URL
    repoEl.target = '_blank'; // Open in new tab
    repoEl.innerText = repo.name; // Add repo name
    reposEl.appendChild(repoEl); // Add repo to repos element
  });
}


form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  const user = search.value; // Get username from input
  if(user) {
    getUser(user); // Get user data
    search.value = ''; // Reset input
  }
});