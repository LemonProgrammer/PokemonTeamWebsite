const http = require('http');
const test = require('./test/test.js');

http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  start();
}).listen(3000);

start = () => {
    let pokeData;
    let url = test.generateAPI('https://pokeapi.co/api/v2/pokemon/');
    let pokemonObject = test.requestInfoFromAPI(url);
    test.displayPokeInformation(pokemonObject);
  };
