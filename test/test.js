let pokeData;
let request = new XMLHttpRequest();

const url = 'https://pokeapi.co/api/v2/pokemon/';
let newurl;
let randomPokemonTeam = [];

class Pokemon {
  constructor(name, dexNum, sprite, type, ability, hiddenA, baseXP) {
    this.name = name;
    this.dexNum = dexNum;
    this.sprite = sprite;
    this.type = type;
    this.ability = ability;
    this.hiddenA = hiddenA;
    this.baseXP = baseXP;
  }
}

let generateAPI = (choice, id) => {
  switch (choice) {
    case "random":
      let random = Math.floor(Math.random() * (807 - 1)) + 1;
      newurl = url + random;
      break;

    case "choose":
      newurl = url + id;
      break;
  };

  loadSinglePokemon();
}

let displayAllPokemon = () => {
  for (let x = 1; x <= 807; x++) {
    let div = document.createElement("div");
    div.id = "poke" + x;
    div.setAttribute('class', 'pokeLink');
    document.getElementById("PokemonList").appendChild(div);
  }

  newurl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=807";
  loadAllPokemon();
}

let loadSinglePokemon = () => {
  request.open('GET', newurl);
  request.onload = loadSingleComplete;
  request.send();
}

let loadTeamMember = () => {
  request.open('GET', newurl);
  request.onload = loadTeamMemberComplete;
  request.send();
}

let loadAllPokemon = () => {
  request.open('GET', newurl);
  request.onload = loadAllComplete;
  request.send();
}

let loadSingleComplete = evt => {
  pokeData = JSON.parse(request.responseText);
  console.log(pokeData);

  let name = pokeData.name;
  let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  // try{
  //   let types = document.getElementById("type").innerHTML = `${pokeData.types[0].type.name} & ${pokeData.types[1].type.name}`;
  //   console.log(types);
  // }catch(err){
  //   let types = document.getElementById("type").innerHTML = `${pokeData.types[0].type.name}`;
  //   console.log(types);
  // }
    
  console.log(pokeData);
  try {
    let types = document.getElementById("type").innerHTML = `${pokeData.types[0].type.name} & ${pokeData.types[1].type.name}`;
    console.log(types);
  } catch (err) {
    let types = document.getElementById("type").innerHTML = `${pokeData.types[0].type.name}`;
    console.log(types);
  }

  let abilities = "";
  let hiddenAbility = "";
  pokeData.abilities.forEach(element => {
    if (element.is_hidden) {
      hiddenAbility = element.ability.name;
    } else {
      abilities += element.ability.name + " ";
    }
  });


  document.getElementById("name").innerHTML = capitalizedName;
  document.getElementById("pic").src = pokeData.sprites.front_default;
  document.getElementById("dexNum").innerHTML = pokeData.id;
  document.getElementById("abilities").innerHTML = abilities;
  document.getElementById("hidden").innerHTML = hiddenAbility;
  document.getElementById("baseXP").innerHTML = pokeData.base_experience;
}

let loadTeamMemberComplete = evt => {
  pokeData = JSON.parse(request.responseText);
  console.log(pokeData);

  let name = pokeData.name;
  let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  let types = [];
  pokeData.types.forEach(element => {
    types.push(element.type.name);
  });

  let abilities = [];
  let hiddenAbility = "";
  pokeData.abilities.forEach(element => {
    if (element.is_hidden) {
      hiddenAbility = element.ability.name;
    } else {
      abilities.push(element.ability.name);
    }
  });

  randomPokemonTeam.push(new Pokemon(capitalizedName, pokeData.id, pokeData.sprites.front_default, types, abilities, hiddenAbility, pokeData.base_experience));
}

let loadAllComplete = evt => {
  pokeData = JSON.parse(request.responseText);
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
  document.getElementById("PokemonList").style.display = "none";
  document.getElementById("pokemon").style.display = "block";
  generateAPI("choose", evt.target.id);
}


window.onload = () => {
  if (document.getElementById("PokemonList") != null) {
    displayAllPokemon();
  } else if (document.getElementById("pokemon") != null) {
    document.getElementById("pokemon").style.display = "block";
    var path = window.location.pathname;

    if (path.toLocaleLowerCase().includes("random")) {
      generateAPI("random");
    } else {
      //this is for selecting a pokemon with the whole list
      //0 = can pokemon name or index
      generateAPI("choose", 0);
    }
  }
}

let generateRandomTeam = () => {
  // generateRandomTeamMember();
  // console.log(newurl);

  // await generateRandomTeamMember();
  // console.log(newurl);

  // for(let x = 0; x < 6;) {
  //   generateRandomTeamMember();
  //   x++
  //   console.log(newurl);
  // }

  generateRandomTeamMember();
  console.log(newurl);

  console.log(randomPokemonTeam);
}

let generateRandomTeamMember = () => {
  let random = Math.floor(Math.random() * (807 - 1)) + 1;
  newurl = url + random;
  loadTeamMember();
}

generateRandomTeam();