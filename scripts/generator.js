let pokeURL = 'https://pokeapi.co/api/v2/pokemon/';


let generateRandomNumber = (min = 1, max = 807) => {
    return Math.floor(Math.random() * max) + min;
};

let generatePokemonURL = (url) => {
    let randNum = generateRandomNumber();
    url += randNum;
    console.log(url);
    return url;
};



let populateMenu = () => {
    let menu = document.getElementById('menu');
    let generateButton = document.createElement('BUTTON');
    generateButton.innerHTML = "Generate";
    generateButton.id = 'genButton';
    menu.appendChild(generateButton);
};

let listenForClicks = () => {
    let genButton = document.getElementById('genButton');
    genButton.addEventListener('click', start);
};

let requestAPI = (url) => {
    // let pokemon = {
    //     name: "",
    //     type: "",
    //     pic: "",
    //     baseXP: ""
    // };
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // pokemon.name = data.name;
        // pokemon.type = data.types[0];
        // pokemon.pic = data.sprites.front_default;
        // pokemon.baseXP = data.base_experience;
    
    generatePokemonTeam(data);
        // return data;
    })
    .catch(err => console.log(err));
    // return pokemon;
};

let createCards = () => {
    let container = document.createElement('div');
    container.className = 'container';
    container.id = 'cardContainer';
    let card = document.createElement('div');
    card.className = 'card';
    let row = document.createElement('div');
    row.className = 'row';
    let imgCol = document.createElement('div');
    imgCol.className = 'col-md-3';
    let textCol =  document.createElement('div');
    textCol.className = 'col-md-8 px-3';
    let cardBlock = document.createElement('div');
    cardBlock.className = 'card-block-px4';

    container.appendChild(card);
    card.appendChild(row);
    row.appendChild(imgCol);
    row.appendChild(textCol);
    textCol.appendChild(cardBlock);
    let resDisplay = document.getElementById('resultsDisplay');
    resDisplay.appendChild(container);
};


let generatePokemonTeam = (pokeData) => {
    // let teamSize = 6;
    
    let teamDisplayCard = document.getElementsByClassName('col-md-3');
    
    let pokePic = document.createElement('img');
    pokePic.src = pokeData.sprites.front_default;
    pokePic.clas = 'image-responsive';
    let pokeInfoDiv = document.getElementsByClassName('card-block-px4');
    
    let pokeHeader = document.createElement('h1');
    pokeHeader.className = 'card-title';
    pokeHeader.innerHTML = `Name: ${pokeData.name}`;
    let pokeHeader2 = document.createElement('h4');
    pokeHeader2.className = 'card-text';
    pokeHeader2.innerHTML = `Type: ${pokeData.types[0]}`;
    let pokeHeader3 = document.createElement('h4');
    pokeHeader3.className = 'card-text';
    pokeHeader3.innerHTML = `BaseXP: ${pokeData.base_experience}`;
    
    teamDisplayCard[0].appendChild(pokePic);

    pokeInfoDiv[0].appendChild(pokeHeader);
    pokeInfoDiv[0].appendChild(pokeHeader2);
    pokeInfoDiv[0].appendChild(pokeHeader3);


};

let start = () => {
    let teamSize = 6;
    let containerNode = document.getElementById('cardContainer');
    if(containerNode == undefined || containerNode == null)
    {
        createCards();
        for(let i = 0; i < teamSize; i++)
        {
            pokeURL = generatePokemonURL(pokeURL);
            
            requestAPI(pokeURL);
            pokeURL = 'https://pokeapi.co/api/v2/pokemon/';
        }

    }
    else
    {
        containerNode.parentNode.removeChild(containerNode);
    }
    
};


// function download(createCards, filename, type) {
//     var file = new Blob([createCards], {type: type});
//     if(window.navigator.msSaveBlob)
//     window.navigator.msSaveBlob(file, filename);
//     else{

//     }
//     var a = document.createElement("a"),
//     url= URL.createObjectURL(file);
//     a.href = url 
//     a.download = filename;
//         document.body.appendChild(a);
//         a.click();
//         setTimeout(function() {
//             document.body.removeChild(a);
//             window.URL.revokeObjectURL(url);  
//         }, 0);
// }

populateMenu();
listenForClicks();