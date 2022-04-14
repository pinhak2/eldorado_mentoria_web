const meuCabecalho = document.getElementById('initial-text');
meuCabecalho.textContent = 'Github Profile Search';

const meuBotao = document.querySelector('button');
meuBotao.addEventListener("click", getUser);


function getUser() {  
    document.getElementById('list-rep').innerHTML = '';
    var gitUser = document.querySelector('input')
    fetch(`https://api.github.com/users/${gitUser.value}`)  //Search for github user 
    .then(response => {
      return response.json() //Converting the response to a JSON object
    }) 
    .then(function(data) {
      if(data.message){
          console.log('User Profile Not Found')
      }else{
          console.log(data)
          document.getElementById('res').innerHTML = `${data.name}`
      }
      return fetch(`https://api.github.com/users/${gitUser.value}/repos`) // Search for Repositories
    })
    .then(response => {
      return response.json()  //Converting the response to a JSON object
    })
    .then(data =>{
          console.log(data)
          document.getElementById('rep').innerHTML = putRepo(data) // Display repositories list
    })
    
    
    .catch(function(error) {
      console.log(error)
    });
}

function putRepo(data) {
  var listDiv = document.getElementById("list-rep");
  var ul=document.createElement('ul');
  for (var i = 0; i < data.length; ++i) {
    var li=document.createElement('li');
    li.innerHTML = data[i].name;
    ul.appendChild(li);
  }
  listDiv.appendChild(ul);
}
var myImage = document.querySelector('img');
