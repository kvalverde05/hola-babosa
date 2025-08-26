// Fetch simple y minimalista para obtener datos de Pokémon
async function fetchPokemon(pokemonName = 'venusaur') {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const pokemonData = await response.json();
    console.log(pokemonData);

    // Actualizar el layout con los datos
    updatePokemonLayout(pokemonData);

    return pokemonData;
  } catch (error) {
    console.error('Error al obtener el Pokémon:', error);
    // Mensaje básico por si algo falla
    const nombreElement = document.getElementById('nombrePokemon');
    const imagenElement = document.getElementById('imagenPokemon');
    if (nombreElement) nombreElement.textContent = 'No se pudo cargar el Pokémon';
    if (imagenElement) {
      imagenElement.alt = 'Imagen no disponible';
      imagenElement.removeAttribute('src');
    }
  }
}

// Función para actualizar el layout con la data del Pokémon
function updatePokemonLayout(pokemonData) {
  const nombreElement = document.getElementById('nombrePokemon');
  const imagenElement = document.getElementById('imagenPokemon');

  if (nombreElement) {
    // nombre "bonito": usa el name principal
    nombreElement.textContent = pokemonData.name;
  }

  // Intentar el artwork oficial; si no, el sprite normal
  const artwork =
    pokemonData?.sprites?.other?.['official-artwork']?.front_default ||
    pokemonData?.sprites?.front_default;

  if (imagenElement && artwork) {
    imagenElement.src = artwork;
    imagenElement.alt = pokemonData.name;
  }
}

// Ejecutar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Cargar arcanine por defecto
  fetchPokemon('arcanine');

  // Agregar event listeners a los enlaces de navegación
  const navLinks = document.querySelectorAll('nav a[data-pokemon]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir navegación
      const pokemonName = e.currentTarget.getAttribute('data-pokemon');
      fetchPokemon(pokemonName);
    });
  });
});