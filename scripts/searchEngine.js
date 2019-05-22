
let takeInputFromBar = () => {
    let inputString = "";
    let searchInput = document.getElementById('pokeSearch').value;
    inputString = searchInput;
    // let messageDiv = document.getElementById('messageDiv');
    // messageDiv.style.visibility = 'none';
    // let resultHeader = document.getElementById('inputResult');
    // let errMessage = document.getElementById('errMessage');
    // let message = `You've entered: ${searchInput}!`;
    let errMess = 'You must enter an input to search, try again!';
    
    if(inputString == "Search Pokemon..." || inputString.length == 0)
    {
        // errMessage.innerHTML = errMess;
        // errMessage.style.display = 'block';
        // resultHeader.style.display = 'none';
        window.alert(errMess);
    }    
    else
    {
        // let pokeForm = document.getElementById('pokeForm');
        // let searchButton = document.getElementById('submitButton');
        // searchButton.submit();
       
        location = "selectPokemon.html" + `?name=${searchInput}`;
        // resultHeader.innerHTML = message;
        // resultHeader.style.display = 'block';
        // errMessage.style.display = 'none';
    }
      
};

let buttonListen = () => {
    
        let submitButton = document.getElementById('submitButton');
        submitButton.addEventListener('click', takeInputFromBar);
        let textBox = document.getElementById('pokeSearch');
  
        textBox.addEventListener('keypress', e => {
            if(e.keyCode == 13)
            {
                takeInputFromBar();
            }
        });
    
};

buttonListen();
