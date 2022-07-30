const pokemonName = document.querySelector('.pokemon_nome');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');



let searchPokemon = 1;

/* Funçao pra fazer a busca dos Pokemons */
const fetchPokemon = async (pokemon) => {
    /* todo fetch(promessa) tem ser assicrono(async) */
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json();   /* assim pra extrair  o json */
        return data;
    }
    
}

/* funçao pra pegar os dados acima e redenizar(mostrar) na tela */
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
    pokemonImage.style.display = 'block';
/* monstrar nome na tela */
    pokemonName.innerHTML = data.name;
/* monstrar number na tela */
    pokemonNumber.innerHTML = data.id;
/* monstrar imagem na tela */
    pokemonImage.src = data ['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';  /* pra limpar o input depois da pesquisa*/
    searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

/* pra pegar o que digitar no input(form) */
form.addEventListener('submit', (event) => {

    event.preventDefault();   /* para bloqueia o form*/
/* passa o valor do input , pra mostrar na tela */
    renderPokemon(input.value.toLowerCase());    /*pra todos ficarem minusculos */
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);  /*assim sempre ao iniciar vai aparecer a tela 1 */

