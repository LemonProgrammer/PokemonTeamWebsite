let generateAPI = (url) => {
    var random = Math.floor(Math.random() * (807 - 1)) + 1;
    // console.log(random);
    let newurl = url + random;
    return newurl;
}

let requestInfoFromAPI = (pokeURL) => {
   let pokeObj = [];
   fetch(pokeURL)
   .then(response => response.json())
   .then(data => {
      for(let prop in data)
      {
        pokeObj[prop] = data[prop];
      }
   })
   .catch(e => console.log(e));
   return pokeObj;
};

let displayPokeInformation = (pokeArray) => {
  let stringData = "";
  for(let stuff in pokeArray)
  {
    console.log(stuff);
    stringData += stuff;
  }
  document.getElementById('pokeInfo').innerHTML = stringData;
};

let start = () => {
  let pokeData;
  let url = 'https://pokeapi.co/api/v2/pokemon/';
  let pokemonObject = requestInfoFromAPI(url);
  displayPokeInformation(pokemonObject);
};

start();