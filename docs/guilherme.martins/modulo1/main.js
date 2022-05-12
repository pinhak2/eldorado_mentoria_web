const project_name = [];
const lngg = [];
const vsblt = [];
const webadd = [];

let header_img = document.querySelector("img");
header_img.onclick = function () {
  let header_src = header_img.src.slice(-10);
  if (header_src === "search.png") {
    header_img.setAttribute("src", "Pacha.png");
  } else {
    header_img.setAttribute("src", "search.png");
  }
};

async function getUserInfo() {
  const username = document.getElementById("search").value;
  const url = `https://api.github.com/users/${username}`;
  cleanPrevious();
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    displayProfile(result);
  } catch (e) {
    console.log(e);
  }

  const repository = `${url}/repos`;
  try {
    const responseRepository = await fetch(repository);

    if (!responseRepository.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resultRepository = await responseRepository.json();
    displayRepos(resultRepository);
  } catch (e2) {
    console.log(e2);
  }
}



function cleanPrevious() {
  const caixa = document.getElementById("caixa");
  const botan = document.getElementById("submit_btn");

  caixa.remove();
  botan.remove();
}

function displayProfile(jsonResponse) {
  var full_name = jsonResponse.name;
  var avatar_img = jsonResponse.avatar_url;
  var cmpny = jsonResponse.company;
  var flwrs = jsonResponse.followers;
  var lctn = jsonResponse.location;

  const name = document.createElement("p");
  const local = document.createElement("p");
  const empresa = document.createElement("p");
  const seguidores = document.createElement("p");
  const profileImg = document.createElement("img");

  name.textContent = `Nome Completo:  ${full_name}`;
  local.textContent = `Localização:  ${lctn}`;
  empresa.textContent = `Empresa:  ${cmpny}`;
  seguidores.innerHTML = `Número de seguidores:  ${flwrs}`;

  profileImg.src = avatar_img;

  const imgcontainer = document
    .getElementById("imgcontainer")
    .appendChild(profileImg);

  document.getElementById("profile").appendChild(imgcontainer);
  document.getElementById("profile").appendChild(name);
  document.getElementById("profile").appendChild(local);
  document.getElementById("profile").appendChild(empresa);
  document.getElementById("profile").appendChild(seguidores);
}



function displayRepos(jsonRepo) {
  jsonRepo.forEach((i) => {
    project_name.push(i.name);
    lngg.push(i.language);
    vsblt.push(i.visibility);
    webadd.push(i.html_url);
  });

  const divRepos = document.createElement("div");
  document.body.appendChild(divRepos);

  for (let i = 0; i < project_name.length; i++) {
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
