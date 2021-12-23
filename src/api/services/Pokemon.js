const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon'
const tenPokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
const getPokemonByName = async (name) => {
    const pokemonResponse = await fetch(`${pokemonUrl}/${name}`)
    return  await pokemonResponse.json()
    
}

const get10Pokemon = async () =>{
    const tenPokemonResponse = await fetch(`${tenPokemonUrl}`)
    return await tenPokemonResponse.json()
}
const ShowPokemon = async (name) => {
    const pokemonData = await getPokemonByName(name);
    return pokemonData
}


export {getPokemonByName, ShowPokemon, get10Pokemon}