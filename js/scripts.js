// Bootstrap Loaded
//CREATES: self invoking function 
let pokemonRepository= (function () { 
  let pokemonList = [];
  let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150';
//CREATES: Function to display all pokemonList
  function getAll() {
      return pokemonList;
  }
// CREATES: Function to add pokemon with required keys 
  function add(pokemon) {
  if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
    pokemonList.push(pokemon);
  } else {
    console.error('Invalid Pokémon:', pokemon);
  }
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
        item.weight = details.weight; //pulls the weight from the API
        item.types = details.types.map((type)=> type.type.name); //pulls the types from the API
    })
      .catch(function(e){ //will catch any errors if the fetch fails
        console.error(e);
    });
  }
//CREATES: function & variables for modal with bootstrap
  
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
    let modalTitle = $('#pokemonModalLabel');
    let modalImage = $('.pokemon-image');
    let modalHeight=$('.pokemon-height');
    let modalWeight=$('.pokemon-weight');
    let modalTypes=$('.pokemon-types');

    modalTitle.text(pokemon.name);
    modalImage.attr('src', pokemon.imageUrl);
    modalHeight.text(`Height: ${pokemon.height}`);
    modalWeight.text(`Weight: ${pokemon.weight}`);
    modalTypes.text(`Type(s): ${pokemon.types.join(', ')}`);//joins the types into a string
//CREATES: call to show the modal
    $('#pokemonModal').modal('show'); //shows the modal
  });
}
// CREATES: Function to create list items in button with pokemon names
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('round-button','btn', 'btn-dark', 'w-100'); //Round buttonn classes in CSS for bootstrap portion
    button.addEventListener('click', function() {
      showDetails(pokemon); //when button is clicked, it will show the details of the pokemon
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
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