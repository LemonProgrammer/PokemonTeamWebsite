let pokeData;
let request = new XMLHttpRequest();

const url = 'https://pokeapi.co/api/v2/pokemon/';
let newurl;

let generateAPI = choice => {
  switch (choice) {
    case "random":
      let random = Math.floor(Math.random() * (807 - 1)) + 1;
      newurl = url + random;
      break;

    case "choose":
      let id = 0;
      newurl = url + id;
      break;
  };

  loadData();
}

let displayAllPokemon = () => {
  for (let x = 1; x <= 807; x++) {
    let div = document.createElement("div");
    div.id = "poke" + x;
    div.setAttribute('class', 'pokeLink');
    document.getElementById("main").appendChild(div);
  }

  newurl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=807";
  loadData();
}

let loadData = () => {
  request.open('GET', newurl);
  request.onload = loadComplete;
  request.send();
}

let loadComplete = evt => {
  pokeData = JSON.parse(request.responseText);

  // try{
  //   let types = document.getElementById("type").innerHTML = `${pokeData.types[0].type.name} & ${pokeData.types[1].type.name}`;
  //   console.log(types);
  // }catch(err){
  //   let types = document.getElementById("type").innerHTML = `${pokeData.types[0].type.name}`;
  //   console.log(types);
  // }
    
  console.log(pokeData);
  
  let x = 1;

  do {
    let a = document.createElement("a");
    let poke = "poke" + x;

    let name = pokeData.results[x - 1].name;
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    a.innerHTML = capitalizedName;
    a.id = x;
    a.addEventListener('click', goToPokemon);

    document.getElementById(poke).appendChild(a);

    x++;
  } while (x < 808);
}

let goToPokemon = (evt) => {
  newurl = url + evt.target.id;
  console.log(newurl);
}

// generateAPI("random");

displayAllPokemon();