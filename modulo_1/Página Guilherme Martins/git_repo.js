function get(){
  console.log(full_name); 
  console.log(lctn);
  console.log(avatar_img); 
  // create a new div element
const name = document.createElement("p");
const local = document.createElement("p");
const empresa = document.createElement("p");
const seguidores = document.createElement("p");
const newImg = document.createElement("img");

// and give it some content
name.innerHTML = 'Nome Completo: ' + full_name;
local.innerHTML = 'Localização: ' + lctn;
empresa.innerHTML = 'Empresa: ' + cmpny;
seguidores.innerHTML = 'Número de Seguidores: ' + flwrs;

// Adicionando imagem com as devidas características
newImg.src = avatar_img;
newImg.width = 200;
newImg.height = 200;
newImg.id = 'userimg';
//newImg.align = 'center'


// add the newly created element and its content into the DOM

document.body.appendChild(newImg);
document.body.appendChild(name);
document.body.appendChild(local);
document.body.appendChild(empresa);
document.body.appendChild(seguidores);

const divRepos = document.createElement("div");
document.body.appendChild(divRepos);

for(let i = 0; i< project_name.length; i++) {
  const projeto = document.createElement("a");
  const visibilidade = document.createElement("p");
  const linguagem = document.createElement("p");
  projeto.classList.add("projetonome");
  projeto.href = webadd[i];
  projeto.textContent = project_name[i];
  visibilidade.innerHTML = vsblt[i];
  linguagem.innerHTML = lngg[i];
  divRepos.appendChild(projeto);
  divRepos.appendChild(visibilidade);
  divRepos.appendChild(linguagem);
  divRepos.appendChild(document.createElement("br"));
  }

}
