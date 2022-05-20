const url = 'https://api.github.com/users/'

function showError(message) {
  document.getElementById('error').innerText = message
}

function showUserInformation({ name, userImage }) {
  document.getElementById('personalInfo').innerText = `Full Name: ${name}`
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
  items.forEach((element) => (element.innerText = ''))
  document.getElementById('avatarImage').src = ''
}

// variável é utilizada no HTML
// eslint-disable-next-line no-unused-vars
function search() {
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
