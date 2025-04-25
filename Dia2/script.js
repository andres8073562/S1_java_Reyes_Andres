let currentPokemonId = 1; // Inicializamos con el primer Pokémon

// Función para obtener información del Pokémon
function fetchPokemon(pokemonId) {
    let xhr = new XMLHttpRequest();
    let link = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    xhr.open('GET', link, true);

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let respuesta = JSON.parse(this.responseText);
            displayPokemon(respuesta);
        }
    };

    xhr.send();
}

// Función para mostrar los detalles del Pokémon
function displayPokemon(data) {
    let pokemonName = document.getElementById("pokemonName");
    let pokemonImage = document.getElementById("pokemonImage");

    pokemonName.textContent = data.name.toUpperCase();
    pokemonImage.src = data.sprites.front_default ? data.sprites.front_default : "";
    pokemonImage.alt = data.name;
    
}

// Función para ir al Pokémon anterior
function prevPokemon() {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
}

function nextPokemon() {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
}

function searchInput() {
const input = document.getElementById("searchInput")
    input.addEventListener("input", function () {
    {
        pokemonId = document.getElementById("searchInput").value;
        console.log( "El valor actual es" + pokemonId)

        if (pokemonId) {
            fetchPokemon(pokemonId);
        } else {
            fetchPokemon(currentPokemonId);
        }

    }
    })
}
fetchPokemon(1);
searchInput();
