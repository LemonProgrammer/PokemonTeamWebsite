exports.generateAPI = (url) => {
    var random = Math.floor(Math.random() * (807 - 1)) + 1;
    // console.log(random);
    let newurl = url + random;
    return newurl;
}

exports.requestInfoFromAPI = (pokeURL) => {
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

exports.displayPokeInformation = (pokeArray) => {
  let stringData = "";
  for(let stuff in pokeArray)
  {
    console.log(stuff);
    stringData += stuff;
  }
  document.getElementById('pokeInfo').innerHTML = stringData;
};


