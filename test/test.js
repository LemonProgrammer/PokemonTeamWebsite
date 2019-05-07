let pokeData;
let request = new XMLHttpRequest();
 
let url = 'https://pokeapi.co/api/v2/pokemon/';
let newurl;

let generateAPI = () => {
    var random = Math.floor(Math.random() * (807 - 1)) + 1;
    console.log(random);
    newurl = url + random;
    loadData();
}

let loadData = () => {
  request.open('GET', newurl);
  request.onload = loadComplete;
  request.send();
}
 
let loadComplete = (evt) => {
  pokeData = JSON.parse(request.responseText);
  console.log(pokeData);
  document.getElementById("name").innerHTML = pokeData.name;
}

generateAPI();