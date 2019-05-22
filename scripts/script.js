let pokeData;
let request = new XMLHttpRequest();

const url = 'https://pokeapi.co/api/v2/pokemon/';
let newurl;

let pokemonTeamNames = [];

let generateRandomNumber = (min = 1, max = 807) => {
  return Math.floor(Math.random() * max) + min;
};

let populateRandTeamControls = () => {
  let controls = document.getElementById('controls');

  let generateButton = document.createElement('BUTTON');
  generateButton.innerHTML = "Generate";
  generateButton.id = 'genButton';
  generateButton.setAttribute("class", "gtBtn");

  let clearButton = document.createElement('BUTTON');
  clearButton.innerHTML = "Clear";
  clearButton.id = 'clrButton';
  clearButton.setAttribute("class", "gtBtn");

  controls.appendChild(generateButton);
  controls.appendChild(clearButton);
};

let listenForClicks = () => {
  let genButton = document.getElementById('genButton');
  genButton.addEventListener('click', generateTeam);

  let clrButton = document.getElementById('clrButton');
  clrButton.addEventListener('click', clearTeam);
};

let hasTeamGenerated = false;
let generateTeam = () => {
  let teamSize = 6;
  let containerNode = document.getElementById('pokeContainer');

  if (!hasTeamGenerated) {
    createCards();
    for (let i = 0; i < teamSize; i++) {
      newurl = url + generateRandomNumber();

      requestAPI(newurl);
      newurl = url;
    }
  };
}

let clearTeam = () => {
  let containerNode = document.getElementById('pokeContainer');

  if (hasTeamGenerated) {
    containerNode.parentNode.removeChild(containerNode);
  }
};

let createCards = () => {
  let container = document.createElement('div');
  container.id = 'pokeContainer';

  let resDisplay = document.getElementById('resultsDisplay');
  resDisplay.appendChild(container);
};

let requestAPI = (url) => {
  fetch(url)
       .then(response => response.json())
       .then(data => {
           generatePokemonTeam(data);
       })
       .catch(err => console.log(err));
};

let generatePokemonTeam = (pokeData) => {
  let name = pokeData.name;
  let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  pokemonTeamNames.push(capitalizedName);

  let types = [];
  pokeData.types.forEach(element => {
      typeName = element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1);
      types.push(typeName);
  });

  let pokeInfoDiv = document.getElementById('pokeContainer');

  let pokeName = document.createElement('h1');
  pokeName.innerHTML = `Name: ${capitalizedName}`;
  pokeName.id = name;
  pokeName.setAttribute("class", "pokeData");
  pokeName.addEventListener('click', goToPokemon);

  let pokePic = document.createElement('img');
  pokePic.src = pokeData.sprites.front_default;
  pokePic.id = name;
  pokePic.setAttribute("class", "pokeData");
  pokePic.addEventListener('click', goToPokemon);

  let pokeType = document.createElement('h4');
  pokeType.innerHTML = `Type: ${types}`;

  let pokeXP = document.createElement('h4');
  pokeXP.innerHTML = `BaseXP: ${pokeData.base_experience}`;

  pokeInfoDiv.appendChild(pokeName);
  pokeInfoDiv.appendChild(pokePic);
  pokeInfoDiv.appendChild(pokeType);
  pokeInfoDiv.appendChild(pokeXP);
};

let generateAPI = (choice, id) => {
  switch (choice) {
    case "random":
      newurl = url + generateRandomNumber();
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

  try {
    let types = document.getElementById("type").innerHTML = `${pokeData.types[0].type.name} & ${pokeData.types[1].type.name}`;
  } catch (err) {
    let types = document.getElementById("type").innerHTML = `${pokeData.types[0].type.name}`;
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

let goToPokemon = evt => {
  let list = document.getElementById("PokemonList");
  let pokemon = document.getElementById("pokemon");

  if(list != null) {
    document.getElementById("PokemonList").style.display = "none";
  }

  document.getElementById("pokemon").style.display = "block";
  generateAPI("choose", evt.target.id);
}

window.onload = () => {
  if (document.getElementById("PokemonList") != null) {
    displayAllPokemon();

  } else if (document.getElementById("generateTeam") == null) {
    document.getElementById("pokemon").style.display = "block";
    let path = window.location.pathname;

    if (path.toLocaleLowerCase().includes("random")) {
      generateAPI("random");

    } else {
      //this is for selecting a pokemon with the whole list
      //0 = can pokemon name or index
      generateAPI("choose", 0);
    }
  } else {
    populateRandTeamControls();
    listenForClicks();
  }
}

function RedirectToSearch() {
  location.replace("selectPokemon.html");
}

function ValidateMon() {
  var result;
  var searchText = document.getElementById("SearchName").value.toLocaleLowerCase();
  console.log(searchText);
  pokeData.results.forEach(pokeman => {
    if(pokeman.name.includes(searchText)) {
      result = true;
      console.log(result);
    }
    else {
      result = false;
      console.log(result);
    }
  });
}