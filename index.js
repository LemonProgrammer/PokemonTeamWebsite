let data;

let pokemon = Math.floor(Math.random()*800);
let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let new_url = data.name;
    console.log(new_url);
    fetch(new_url)
      .then(response1 => response1.json())
     .then(data1 => {
       console.log(data1);
     });
  })
  .catch(e => console.log(e));