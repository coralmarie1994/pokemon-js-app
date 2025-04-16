//CREATES: 1.7 API Linked
//CREATES: self invoking function 
let pokemonRepository= (function () { 
//CREATES: empty array that will hold pokemon object info
  let pokemonList = [];
  let apiUrl="https://pokeapi.co/api/v2/pokemon/?limit=150";
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
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");

    listpokemon.appendChild(button);
    pokemonListElement.appendChild(listpokemon);

    button.addEventListener("click", function() {
      pokemonRepository.loadDetails(pokemon).then(function() {
        showDetails(pokemon);
    });
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
    })
      .catch(function(e){ //will catch any errors if the fetch fails
        console.error(e);
    });
  }
//CREATES: function for modal details
function showModal(name, imageUrl, height, weight, types) {
  let modalContainer =document.querySelector("#modal-container"); //selects the modal container
  modalContainer.innerHTML = ""; //clears the modal container 

  let modal = document.createElement("div"); //creates a div for the modal
  modal.classList.add('modal');

  let closeButtonElement = document.createElement("button"); //creates a button for the modal
  closeButtonElement.classList.add("modal-close"); //adds a class to the button
  closeButtonElement.innerText = "X"; //adds text to the button X for close
  closeButtonElement.addEventListener('click', hideModal);

  let pokemonName=document.createElement("h1"); //creates a header for the modal
  pokemonName.innerText = name; //adds the name of the pokemon to the header 1

   let pokemonImage = document.createElement("img"); //creates an image for the modal
  pokemonImage.setAttribute("src", imageUrl); //sets the source of the image to the imageUrl
  pokemonImage.setAttribute('width', '100%');
  pokemonImage.setAttribute('height', '100%');


  let pokemonDetailParagraph = document.createElement("div"); //creates a paragraph for the modal
  pokemonDetailParagraph.classList.add("pokemon-detail-paragraph");
  pokemonDetailParagraph.innerText=''; //adds a class to the paragraph

  let pokemonHeight = document.createElement("span"); //creates a paragraph for the modal
  pokemonHeight.innerText = `
  Height: ${height} m

  `; //adds the height of the pokemon to the paragraph

  let pokemonWeight = document.createElement("span"); //creates a paragraph for the modal
  pokemonWeight.innerText = `Weight: ${weight} kg

  `; //adds the weight of the pokemon to the paragraph

  let pokemonTypes = document.createElement("span"); //creates a paragraph for the modal 
  pokemonTypes.innerText = `Type: ${types.join(', ')}
  
  `; //adds the types of the pokemon to the paragraph

  modal.appendChild(closeButtonElement);
  modal.appendChild(pokemonName);
  modal.appendChild(pokemonImage);
  modal.appendChild(pokemonDetailParagraph)
  modal.appendChild(pokemonHeight);
  modal.appendChild(pokemonWeight);
  modal.appendChild(pokemonTypes);
  pokemonDetailParagraph.appendChild(pokemonHeight);
  pokemonDetailParagraph.appendChild(pokemonWeight);
  pokemonDetailParagraph.appendChild(pokemonTypes);
  modalContainer.appendChild(modal); //appends the modal to the modal container
  modalContainer.classList.add("is-visible"); //adds a class to the modal container to make it visible
  
  modalContainer.addEventListener('click',(event) => { //adds an event listener to the modal container)
  let target= event.target; //target is the element that was clicked
  console.log(event.target);
    if (target === modalContainer) {
    hideModal();
    }
  }); //adds an event listener to the close button to hide the modal
  window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector("#modal-container");
  if (e.key === 'Escape' && modalContainer.classList.contains("is-visible")) {
    hideModal();
  }
});
}
  
//CREATES: function to hide the modal
function hideModal() {
  let modalContainer = document.querySelector("#modal-container"); //selects the modal container
  modalContainer.classList.remove("is-visible"); //removes the class from the modal container to hide it
}  
//CREATES: show of detaials passing to showModal function
  function showDetails(pokemon) {
    showModal(
      pokemon.name,
      pokemon.imageUrl,
      pokemon.height,
      pokemon.weight,
      pokemon.types.map(type => type.type.name)
    );
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