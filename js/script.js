const pokemonContainer = document.getElementById('pokemon-container');
const pokemonTemplate = document.getElementById('pokemon-template');

const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (APIResponse.ok) {
            const data = await APIResponse.json();
            return data;
        } else {
            console.error(`Falha ao buscar o Pokémon #${pokemon}: ${APIResponse.status}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao buscar o Pokémon #${pokemon}:`, error);
        return null;
    }
};

const renderPokemon = (data) => {
    const pokemonElement = pokemonTemplate.cloneNode(true);
    pokemonElement.style.display = 'block';

    pokemonElement.querySelector('.pokemon_imagem').src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    pokemonElement.querySelector('.pokemon_imagem').alt = data.name;
    pokemonElement.querySelector('.pokemon_nome').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokemonElement.querySelector('.pokemon_numero').textContent = `#${data.id}`;

    const types = data.types.map(typeInfo => typeInfo.type.name).join(', '); 
    const typeElement = document.createElement('h4');
    typeElement.classList.add('pokemon_tipo');
    typeElement.textContent = ` ${types.charAt(0).toUpperCase() + types.slice(1)}`; 
    pokemonElement.querySelector('.card').appendChild(typeElement); 


    pokemonContainer.appendChild(pokemonElement);
};

const fetchAndRenderAllPokemon = async () => {
    for (let i = 1; i <= 151; i++) {
        const data = await fetchPokemon(i);
        if (data) {
            renderPokemon(data);
        }
    }
};

fetchAndRenderAllPokemon();
