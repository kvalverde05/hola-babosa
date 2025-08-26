// Fetch simple y minimalista para obtener datos de Pokémon
async function fetchPokemon(pokemonName = 'venusaur') {
    try {
        const response = await fetch(https://pokeapi.co/api/v2/pokemon/${pokemonName});
        
        if (!response.ok) {
            throw new Error(Error: ${response.status});
        }
        
        const pokemonData = await response.json();
        console.log(pokemonData);
        
        // Actualizar el layout con los datos
        updatePokemonLayout(pokemonData);
        
        return pokemonData;
        
    } catch (error) {
        console.error('Error al obtener el Pokémon:', error);
    }
}

// Función para actualizar el layout con la data del Pokémon
function updatePokemonLayout(pokemonData) {
    const nombreElement = document.getElementById('nombrePokemon');
    const imagenElement = document.getElementById('imagenPokemon');
    
    if (nombreElement && pokemonData.forms && pokemonData.forms[0]) {
        nombreElement.textContent = pokemonData.forms[0].name;
    }
    
    // Actualizar la imagen del Pokémon
    if (imagenElement && pokemonData.sprites && pokemonData.sprites.other && pokemonData.sprites.other['official-artwork']) {
        imagenElement.src = pokemonData.sprites.other['official-artwork'].front_default;
        imagenElement.alt = pokemonData.name;
    }
}

// Ejecutar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar bulbasaur por defecto
    fetchPokemon('arcanine');
    
    // Agregar event listeners a los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a[data-pokemon]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir navegación
            const pokemonName = e.target.getAttribute('data-pokemon');
            fetchPokemon(pokemonName);
        });
    });
});