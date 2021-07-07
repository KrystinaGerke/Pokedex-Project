let pokemonRepository = (function () {
  // modal info
  let pokedexPokemonList = document.querySelector('.pokemon-list');
let pokedexScreen = document.querySelector('.pokedex-screen');
let modalContainer = document.querySelector('#modal-container');
let modal = document.querySelector('.modal');

let modalClose = document.createElement('button');
  modalClose.classList.add('modal-close');
let pokeName = document.createElement('h1');
 pokeName.classList.add('Pokename');
let pokeHeight = document.createElement('p');
 pokeHeight.classList.add('Pokeheight');
let imageContainer = document.createElement('div');
  imageContainer.classList.add('img-container');
let pokeImage = document.createElement('img');
  pokeImage.classList.add('PokeImage');
let pokeType = document.createElement('p');
  pokeType.classList.add('Poketype');

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon)
      // "detailsUrl" in pokemon
     {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name.toUpperCase();
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function(){
		    showDetails(pokemon);
        });
    }

function showModal() {
      modalContainer.classList.add('is-visible');
    }

//Hide Modal Event Listeners

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    modalClose.addEventListener('click' , hideModal);

    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });



function showDetails(pokemon){
  loadDetails(pokemon).then(function () {
    pokeName.innerHTML = pokemon.name.toUpperCase();
        pokeHeight.innerHTML = 'Height: ' + pokemon.height;
        pokeType.innerHTML = 'Type: ' + pokemon.types.toUpperCase();
        pokeImage.src = pokemon.imageUrl;
        modalClose.innerHTML = "Close";
        showModal();
  });
}

function loadList() {
    return fetch(apiUrl)
    .then(response => response.json())
    .then(json => {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
        };
          add(pokemon);
          console.log(pokemon);
          });
    })
    .catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types[0].type.name;
    }).catch(function (e) {
      console.error(e);
    });
  }

  modal.appendChild(modalClose);
  modal.appendChild(pokeName);
  modal.appendChild(pokeHeight);
  modal.appendChild(pokeType);
  modal.appendChild(imageContainer);
  imageContainer.appendChild(pokeImage);

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
    };
  })(); //fires the function


pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
