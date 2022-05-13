/* eslint-disable no-unused-vars */
function getUser() {
	const gitUser = document.querySelector('input' );
	document.getElementById('list-rep').innerHTML = '';
	//Search for github user
	fetch (`https://api.github.com/users/${gitUser.value}`)
		.then(response => {
			return response.json(); //Converting the response to a JSON object
		}) 
		.then(function(data) {
			if(data.message){
				console.log('User Profile Not Found');
			}else{
				console.log(data);
				document.getElementById('res').innerHTML = `${data.name}`;
			}
			return fetch(`https://api.github.com/users/${gitUser.value}/repos`); // Search for Repositories
		})
		.then(response => response.json()) //Converting the response to a JSON object
		.then(data =>{
			console.log(data);
			document.getElementById('rep').innerHTML = putRepo(data); // Display repositories list
		})
		.catch(function(error) {
			console.log(error);
		});
}

//meuBotao.addEventListener('click', getUser);

function putRepo(data) {
	var listDiv = document.getElementById('list-rep');
	var ul=document.createElement('ul');
	for (let object of data) {
		var li=document.createElement('li');
		li.innerHTML = object.name;
		ul.appendChild(li);
	}
	listDiv.appendChild(ul);
}
//var myImage = document.querySelector('img');
