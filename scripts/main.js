const meuCabecalho = document.querySelector('h1');
meuCabecalho.textContent = 'Github Profile Search';

const meuBotao = document.querySelector('button');
meuBotao.addEventListener("click", getUser);


function getUser() {  
    var gitUser = document.querySelector('input')
    fetch(`https://api.github.com/users/${gitUser.value}`)  //Search for github user 
    .then(response => {
      return response.json()
    }) //Converting the response to a JSON object
    .then(function(data) {
      if(data.message){
          console.log('User Profile Not Found')
      }else{
          console.log(data)
          document.getElementById('res').innerHTML = `
          ${data.name}`
      }
      return fetch(`https://api.github.com/users/USER_GITHUB/${gitUser.value}/repos`)
    })
    .then(response => {
      return response.json()
    }) //Converting the response to a JSON object
    .then(data =>{
          console.log(data)
          document.getElementById('rep').innerHTML = `${data}`
    })
    .catch(function(error) {
      console.log(error)
    });
}

var myImage = document.querySelector('img');