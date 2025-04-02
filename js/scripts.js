//CREATES: IIFE for pokemon array list to print to the page
var pokemonRepository = (function () { 
//CREATES: Array with pokemon name, height & type
  let pokemonList = [
    {
      name:'Pikachu', 
      height:.4, 
      type:'electric'
    },
    {
      name:'Charmander', 
      height:.6, 
      type:'fire'
    },
    {
      name:'Bulbasaur',
      height:.7, 
      type:['grass','poison']
    },
    {
      name:'Squirtle',
      height:.5,
      type:'water'
    },
    {
      name:'Ditto',
      height: .3,
      type:'normal'
    },
    {
      name:'Exeggutor',
      height:2.0,
      type:['grass','psychic']
    },
  ];
  //CREATES: Function to add pokemon to list when required keys included & outside
    function getAll() {
        return pokemonList;
    }
    // CREATES: Function to add pokemon with required keys
    function add(addPokemon) {
        let keysNeeded = ['name', 'height', 'type'];
        if (
            typeof addPokemon === 'object' && // checks if item is an object
            Object.keys(addPokemon).length === keysNeeded.length && // checks if amount of keys in item is the same as the amount defined in keysNeeded
            addPokemon !== null && // prevent typeof null === 'object' quirk
            addPokemon.name !== undefined && // checks if name is defined
            addPokemon.height !== undefined && //checks if height is defined
            addPokemon.type !== undefined // checks if type is defined
        ) {
            pokemonList.push(addPokemon); // add item if expectations are met
        } else {
            console.error('Please provide an object with name, height and type properties') // print error in console, if expectations were not met
        }
    }
    // CREATES: Function to add event listener to button
    function addListenerToButton(button, pokemon) {
        button.addEventListener('click', function () { // Event listener, that listens to 'click'
            showDetails(pokemon); // Call showDetails()-function with pokemon as parameter
        });
    }
    // CREATES: Function to create list items in button with pokemon names
    function addListItem(pokemon) {
        let pokemonsList = document.querySelector('.pokemon-list');
        let listItemPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name; // Text of Button is = name of Pokémon
        button.classList.add('button-class'); // Add a class to the button for easier styling
        addListenerToButton(button, pokemon); // function addListenerTo Button is called and passed with the 2 arguments (button, pokemon)

        listItemPokemon.appendChild(button); // Append button to list item 
        pokemonsList.appendChild(listItemPokemon); // Append list item to ul
    }

    //CREATES: Function to show Pokémon details on console
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    // CREATES: Accessibility from outside of the function
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    }
})();
// CREATES: Filter Search
function findName(nameList, nameSearched) {
    return nameList.filter((addPokemon) =>
        addPokemon.name.toLowerCase().includes(nameSearched.toLowerCase())
    );
}
//CREATES: Run of all Repository
pokemonRepository.getAll().forEach(pokemonRepository.addListItem);