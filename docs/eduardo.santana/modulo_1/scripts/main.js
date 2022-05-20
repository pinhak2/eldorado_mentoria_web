/* eslint-disable no-unused-vars */

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
function clearBox(elementId) {
	document.getElementById(elementId).innerText = '';
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
		};
	} catch(err) {
		showError();
	}
}

async function getUserRepo() {
	try{
		//Search for repository
		const response = await fetch(`${url}${gitUser.value}/repos`);
		const json = await response.json();
		return {
			data: json,
		};
	} catch (er) {
		console.log('error');
	}
}

function setup() {
	clearBox('getUserError');
	clearBox('repositoryList');
	getUser()
		.then(data => {
			document.getElementById('personalInfo').innerText = `${data.name}`;
		})
		.catch(err => console.error(err));
	getUserRepo()
		.then(data => {
			document.getElementById('gitUserInfo').innerHTML = putRepo(data.data);
		})
		.catch(err => console.error(err));
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