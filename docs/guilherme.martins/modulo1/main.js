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
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    var full_name = result.name;
    var avatar_img = result.avatar_url;
    var cmpny = result.company;
    var flwrs = result.followers;
    var lctn = result.location;
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
    resultRepository.forEach((i) => {
      project_name.push(i.name);
      lngg.push(i.language);
      vsblt.push(i.visibility);
      webadd.push(i.html_url);
    });
  } catch (e2) {
    console.log(e2);
  }

  var newwin = window.open("git_repo.html", "_blank");
  newwin.onload = function () {
    this.full_name = full_name;
    this.avatar_img = avatar_img;
    this.cmpny = cmpny;
    this.flwrs = flwrs;
    this.lctn = lctn;
    this.project_name = project_name;
    this.lngg = lngg;
    this.vsblt = vsblt;
    this.webadd = webadd;
    this.get();
  };

  cleanPrevious();
}



function cleanPrevious(){
  const caixa = document.getElementById("caixa");
  const botan = document.getElementById("submit_btn");

  caixa.remove();
  botan.remove();
}

