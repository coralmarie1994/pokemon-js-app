//CREATES: 1.7 API Linked
//CREATES: self invoking function 
let pokemonRepository= (function () { 
//CREATES: empty array that will hold pokemon object infolet 
pokemonList = [];
  let apiUrl="https://pokeapi.co/api/v2/pokemon/?limit=1000"; //link to API with 1000 pokemon (limt=1000)
// CREATES: Function to add pokemon with required keys or
  function add(pokemon) {
    if (
        typeof pokemon === "object" && // checks if item is an object
        "name" in pokemon && // checks if name is defined
        "detailsUrl" in pokemon // checks if detailsUrl is defined
    ) {
        pokemonList.push(pokemon); // add item if keys are met
    } else {
        console.error('Pokemon is incorrect') // print error in console, if expectations were not met
    }
  }
//CREATES: Function to display all pokemonList
  function getAll() {
      return pokemonList;
  }
// CREATES: Function to create list items in button with pokemon names
  function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list"); //selects the pokelist element of HTML gives variable
      let listpokemon = document.createElement("li"); //creates list element called listpokemon
      let button = document.createElement("button"); //creates button element
      button.innerText = pokemon.name; // Text of Button is = name of Pokémon
      button.classList.add("button-class"); // Add a class to the button for easier styling
      listpokemon.appendChild(button); // Append button to list item -- button is child of list
      pokemonList.appendChild(listpokemon); // Append list item to ul -- take the let listpokemon and append it to the pokemonList(parent)
      button.addEventListener("click", function(event) { //CREATES: event listener for button
          showDetails(pokemon); //when clicked, show details of the pokemon
      });
  }
//CREATES: function for list load (promise function-- then then catch)
  function loadList() { //this is the fetch for API pokemon list
    return fetch(apiUrl)
      .then(function (response) { 
        return response.json(); //parse (translates) the response as JSON- 
    })
      .then(function (json) {
        json.results.forEach(function (item) { //creates array with name & url for each one by one
          let pokemon = {
            name: item.name, //gives it a name (name: Pikachu)
            detailsUrl: item.url //gives it a url that leads to more details (detailsUrl: https://pokeapi.co/api/v2/pokemon/1/)
          };
          add(pokemon); //will add the pokemon to the pokemonList
          console.log(pokemon);
      });
    })
      .catch(function (e) { //will catch any errors if the fetch fails
        console.error(e);
    })
  }
//CREATES: a promise function to load the details of each pokemon
  function loadDetails(item){
    let url =item.detailsUrl;
    return fetch(url)
      .then(function(response){
        return response.json();
    })

    //CREATES: details for the item
      .then(function(details){
        item.imageUrl = details.sprites.front_default; //pulls the image from the API
        item.height = details.height; //pulls the height from the API
        item.types = details.types; //pulls the types from the API
        item.weight = details.weight; //pulls the weight from the API
        item.abilities = details.abilities; //pulls the abilities from the API
    })
      .catch(function(e){
        console.error(e);
    });
  }
//CREATES: show of detaials
  function showDetails(item) {
    pokemonRepository.loadDetails(item)
      .then(function(){
        console.log(item);
    });
  }
//CREATES: management system for the pokemonList for the function above
  return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  }
})(); //(); will immediately invoke the function


//WHEN PAGE LOADS: load list runs, then goes through each of pokemon in repository, then adds to the list 
//CREATES: function to load the names & details of each pokemon
  pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) { 
    pokemonRepository.addListItem(pokemon); //loadList function is called and then the addListItem function is called
    }); //loadList function is called and then the addListItem function is called
  });

//CREATES: console log entire API list of Pokemon --> this is added under loadList console.log(pokemon)
//console.log(pokemonRepository.getAll()); 

