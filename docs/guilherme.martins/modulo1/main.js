//document.querySelector('html').onclick = function() {
    //alert('Ai! Pare de me cutucar!');
//}

const project_name = [];
const lngg = [];
const vsblt = [];
const webadd = [];

let myimg = document.querySelector('img');
myimg.onclick = function() {
	let mysrc = myimg.getAttribute('src');
	if (mysrc === 'search.png')
	{
		myimg.setAttribute('src','Pacha.png');
	}
		else
		{
		myimg.setAttribute('src','search.png');
		}
}

const searchInput = document.getElementById('submit_btn');

searchInput.addEventListener("click", getUserInfo);


//searchInput.addEventListener("input", (e) => {
	//let value = e.target.value 
	
	async function getUserInfo(){
	const usrnm = document.getElementById('search').value;
	const url = "https://api.github.com/users/" + usrnm 
	try{
		const response = await fetch(url)
		
		if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
		}
	const result = await response.json()
	var full_name = result.name
	var avatar_img = result.avatar_url
	var cmpny = result.company
	var flwrs = result.followers
	var lctn = result.location
	} catch(e) {
		console.log(e)
	}
	
	
	const repos = url + '/repos'
	try{
		const response2 = await fetch(repos)
		
		if (!response2.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
		}
	const result2 = await response2.json()
	result2.forEach(i => {
	project_name.push(i.name);
	lngg.push(i.language);
	vsblt.push(i.visibility);
	webadd.push(i.html_url);})
	console.log(webadd);
	console.log(lngg);
	console.log(vsblt);
	console.log(full_name);
	console.log(result2)
	} catch(e2) {
		console.log(e2)
	}
	
	var newwin = window.open('git_repo.html', '_blank')
	newwin.onload = function(){
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
	}	
	
	
	
}




 