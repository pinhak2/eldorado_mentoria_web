const gitUser = document.querySelector('input');
const url = 'https://api.github.com/users/';

gitUser.addEventListener('keypress', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		document.getElementById('myBtn').click();
	}
});

function showError() {
	document.getElementById('getUserError').innerText = 'Não foi possivel encontrar usuário! Tente Novamente !';
}

function clearBox(elementIdArray) {
	for (let object of elementIdArray) 
		document.getElementById(object).innerText = '';
}

function showInfo(data) {
	document.getElementById('personalInfo').innerText = `Full Name: ${data.name}`;
	let img = document.createElement('img');
	img.src = `${data.userImage}`;
	let src = document.getElementById('avatarImage');
	src.appendChild(img);
}

function putRepo(data) {
	let listDiv = document.getElementById('repositoryList');
	let ul=document.createElement('ul');
	for (let object of data) {
		let li=document.createElement('li');
		li.innerHTML = object.name;
		ul.appendChild(li);
	}
	listDiv.appendChild(ul);
}

async function getUser() {
	try {
		//Search for github user
		const response = await fetch(`${url}${gitUser.value}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const json = await response.json();
		return {
			name: json.name,
			userImage: json.avatar_url, 
		};
	} catch(err) {
		showError();
	}
}

async function getUserRepo() {
	try{
		//Search for repository
		const response = await fetch(`${url}${gitUser.value}/repos`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const json = await response.json();
		return {
			data: json,
		};
	} catch (er) {
		console.log('error');
	}
}

function setup() {
	clearBox(['getUserError', 'repositoryList', 'personalInfo','avatarImage']);
	getUser()
		.then(data => showInfo(data))
		.catch(err => console.error(err));
	getUserRepo()
		.then(data => {
			document.getElementById('gitUserInfo').innerHTML = putRepo(data.data); 
		})
		.catch(err => console.error(err));
}
