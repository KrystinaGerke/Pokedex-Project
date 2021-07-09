// IIFE wrapper
let pokemonRepository = (function () {
  // empty array to put pokemon into
  let pokemonList = [];
  // pokemon info link
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

// function to add anything to pokemonList within the repository & check type of item is an object
  function add(pokemon) {
    if (
      // item validation
      typeof pokemon === "object" &&
      "name" in pokemon)
      // "detailsUrl" in pokemon
     {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
// returns list
    function getAll() {
      return pokemonList;
    }

// hooks from HTML
    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list"); //pulls ul
      let listpokemon = document.createElement("li"); //creates list items
      listpokemon.classList.add("group-list-item", "list-group-item-action");
      let button = document.createElement("button"); //actually makes the button
      button.innerText = pokemon.name.toUpperCase(); //putting the pokemon name in the button
      button.classList.add("btn", "btn-outline-primary", "btn-block"); // "button-class",
      button.setAttribute("data-toggle", "modal") //revisit
      button.setAttribute("style") //might need to revisit
      listpokemon.appendChild(button); //adds new button onto the bottom
      pokemonList.appendChild(listpokemon); //adds the pokemon onto the buttons until all of the selected ones run out
          //calls pokemon info when clicked
        button.addEventListener('click', function(){
		    showDetails(pokemon);
        });
    }

    // Add loadList() function as a return key
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

    //get pokemon details from url
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // add details to item pokemon
       pokemon.imageUrlFront = details.sprites.front_default;
       pokemon.imageUrlBack = details.sprites.back_default;
       pokemon.height = details.height;
       pokemon.weight = details.weight;
       pokemon.height = details.height;
       pokemon.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
    }

    // function showDetails with then to return JSON response
 function showDetails(pokemon) {
   loadDetails(pokemon).then(function () {
     showModal(pokemon);
   });
 }

 // function showModal
   function showModal(pokemon) {
     let modalBody = $(".modal-body");
     let modalTitle = $(".modal-title");
     let modalHeader = $('.modal-header');

     modalTitle.empty();
     modalBody.empty();

     //creating element for name in modal content
     let nameElement = $("<h1>" + pokemon.name + "</h1>");
     // creating img in modal content
     let imageElementFront = $(
       '<img class="modal-img" alt="Front of ' +
         pokemon.name + '" ' + 'style="width:50%">'
        );
     imageElementFront.attr("src", pokemon.imageUrlFront);
     let imageElementBack = $(
       '<img class="modal-img" alt="Back of ' + pokemon.name + '" ' + ' style="width:50%">'
        );
     imageElementBack.attr("src", pokemon.imageUrlBack);
     // creating element for height in modal content
     let heightElement = $("<p>" + "Height : " + pokemon.height + "</p>");
     // creating element for weight in modal content
     let weightElement = $("<p>" + "Weight : " + pokemon.weight + "</p>");
     // creating element for type in modal content
     let typesDiv = document.createElement("div");
     typesDiv.classList.add("type-wrapper");
     typesDiv.classList.add("row");
     

     pokemon.types.forEach((type) => {
       let typesElement = document.createElement("span");
       let typesText = document.createElement("p");
       typesText.innerText = type.type.name;
       typesElement.classList.add("type");
       typesElement.classList.add("col");
       typesElement.classList.add(type.type.name);
       typesElement.appendChild(typesText);
       typesDiv.appendChild(typesElement);
     });

     modalTitle.append(nameElement);
     modalBody.append(imageElementFront);
     modalBody.append(imageElementBack);
     modalBody.append(heightElement);
     modalBody.append(weightElement);
     modalBody.append(typesDiv);

     $("#pokemonModal").modal("toggle");
   }

   //add event listener to search bar
   searchInput.addEventListener("input", function () {
     let listPokemon = document.querySelectorAll("li");
     let value = searchInput.value.toUpperCase();

     listPokemon.forEach(function (pokemon) {
       if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
         pokemon.style.display = "";
       } else {
         pokemon.style.display = "none";
       }
     });
   });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    };
  })(); //fires the function


pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
