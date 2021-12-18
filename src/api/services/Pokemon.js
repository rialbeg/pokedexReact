const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon'

const getPokemonByName = async (name) => {
    const pokemonResponse = await fetch(`${pokemonUrl}/${name}`)
    return  await pokemonResponse.json()
    
}
const pokemon = {
    name:''
}
const getName = () => pokemon

const ShowPokemon = async (name) => {
    const pokemonData = await getPokemonByName(name);
    return pokemonData
}


export {getPokemonByName, ShowPokemon}