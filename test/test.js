const generateAPI = (url) => {
    var random = Math.floor(Math.random() * (807 - 1)) + 1;
    // console.log(random);
    let newurl = url + random;
    return newurl;
}

const requestInfoFromAPI = (pokeURL) => {
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

exports.start = () => {
  let url = generateAPI('https://pokeapi.co/api/v2/pokemon/');
  let pokemonObject = requestInfoFromAPI(url);
  let stringData = "";
  for(let stuff in pokemonObject)
  {
    console.log(stuff);
    stringData += stuff;
  }
 return stringData;
};
