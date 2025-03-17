let pokemonRepository = (function() { //IIFE (immediately invoked function) for pokemon array to keep isolated from gloabl scope
var pokemonList=[ //array with pokemon name & height & type
    {name:'Pikachu', height:.4, type:'electric'},
    {name:'Charmander', height:.6, type:'fire'},
    {name:'Bulbasaur', height:.7, type:['grass','poison']},
    {name:'Squirtle', height:.5, type:'water'},
    {name:'Ditto', height: .3, type:'normal'},
    {name:'Exeggautor', height:2.0, type:['grass','psychic']},
    ];
    return {
        add:function(pokemon) {
            pokemonList.push(pokemon);
        },
        getAll:function() {
            return pokemonList;
    }
    };
}) ();
//forEach loop to print out pokemon name and height
pokemonRepository.getAll().forEach(function(pokemon) {
    let message = ''; //creates empty string for possible height messages
    if (pokemon.height > 1.0) {
        message = "-WOW, that's big!";
    }
    document.write("<p>" + `${pokemon.name}: ${pokemon.height} meters ${message}`+ "</p>");
});
//
//  for (var i = 0; i < pokemonList.length; i++) { //loops over all pokemon
//let message = ''; // creates empty string message
//if (pokemonList[i].height > 1.0) {
//    message = "-WOW, that's big!"; // pokemon larger than 1.0 meter will have this message
//} 
//    document.write(`<span class="pokemon-name">${pokemonList[i].name}</span> <span class="pokemon-height">height: ${pokemonList[i].height} meters</span> <span class="pokemon-message">${message}</span><br>`);
//}