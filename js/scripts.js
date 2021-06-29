let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Pikachu",
      type: ["electric"],
      height: 0.4
    },
    {
      name: "Bulbasaur",
      type: ["grass", "poison"],
      height: 0.7
    },
    {
      name: "Charmander",
      type: ["fire"],
      height: 0.6
    },
    {
      name:  "Squirtle",
      type: ["water"],
      height: 0.5
    }
  ];
  function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }

    return {
      add: add,
      getAll: getAll
    };
  })();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Eevee' });
console.log(pokemonRepository.getAll());

/* for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + "- Height: " + pokemonList[i].height)
  console.log(pokemonList[i].name + " Height: " + pokemonList[i].height)
if ([pokemonList[i].height] < 0.5) {
  document.write(" - This Pokemon is SMOL!")
}
 document.write("<br>");
} */

/*pokemonList.forEach(function(pokemon){
  console.log(pokemon);
});*/
