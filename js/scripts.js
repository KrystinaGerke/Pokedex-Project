let pokemonRepository = (function () {
  let repository = [
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
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "type" in pokemon &&
      "height" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

    function getAll() {
      return repository;
    }

    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function(){
		    showDetails(pokemon);
        });
    }

    function showDetails(pokemon){
	  console.log(pokemon);
  }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
    };

  })();

console.log(pokemonRepository.getAll());

pokemonRepository.add({
  name: 'Eevee',
  type: ["normal"],
  height: 1.0
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
