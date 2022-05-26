const url = 'https://api.github.com/users/'

function showError(message) {
  document.getElementById('error').innerText = message
}

function showUserInformation({ name, location, following, followers, email, login, company, userImage }) {
  document.getElementById('fullName').innerText = `${name}`
  document.getElementById('login').innerText = `${login}`
  document.getElementById('company').innerText = `${company}`
  document.getElementById('Company').innerText = `Company`
  document.getElementById('email').innerText = `${email}`
  document.getElementById('Email').innerText = `Email`
  document.getElementById('followers').innerText = `${followers}`
  document.getElementById('Followers').innerText = `Followers`
  document.getElementById('following').innerText = `${following}`
  document.getElementById('Following').innerText = `Following`
  document.getElementById('location').innerText = `${location}`
  document.getElementById('Location').innerText = `Location`
  following
  document.getElementById('avatarImage').src = userImage
}

function buildUserRepositories(data) {
  const repositoryContainer = document.getElementById('repositoryContainer')
  const repositoryList = document.createElement('ul')
  for (const object of data) {
    const listItem = document.createElement('li')
    listItem.innerHTML = object.name
    repositoryList.appendChild(listItem)
  }
  repositoryContainer.appendChild(repositoryList)
}

async function getGithubUser(username) {
  const response = await fetch(`${url}${username}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const json = await response.json()
  return {
    name: json.name,
    login: json.login,
    company: json.company,
    email: json.email,
    followers: json.followers,
    location: json.location,
    following: json.following,
    userImage: json.avatar_url,
  }
}

async function getGithubUserRepositories(username) {
  // Search for repository
  const response = await fetch(`${url}${username}/repos`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const json = await response.json()
  return {
    data: json,
  }
}

function clear() {
  const items = [...document.getElementsByClassName('clear')]
  items.forEach((element) =>{
    console.log(element);
    (element.innerText = '');
  })
  document.getElementById('avatarImage').src = ''
}

// variável é utilizada no HTML
// eslint-disable-next-line no-unused-vars
function search(event) {
  event.preventDefault()
  clear()
  const username = document.getElementById('searchText').value
  getGithubUser(username)
    .then((data) => {
      showUserInformation(data)
      return getGithubUserRepositories(username)
    })
    .then((data) => buildUserRepositories(data.data))
    .catch(() => {
      showError(
        'Não foi possivel aquisitar as informações do usuário! Tente Novamente!'
      )
    })
}
