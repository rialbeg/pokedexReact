import {ShowPokemon,getPokemonByName} from './api/services/Pokemon'
import {useState,useEffect} from 'react'
async function getPokemonName(){
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  return await response.json()
}

function getRandomNumberBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
function App() {
  const [pokemon,setPokemon] = useState({
    name:'asdf',
    image:'',
    moves:[],
    abilities:[],
    types:[]
  })
  
  useEffect(() => {
    const fetchData = async () => {
      const pok = await getPokemonByName(getRandomNumberBetween(1,898))
      console.log(pok)
      setPokemon({
        name:pok.name,
        image:pok.sprites.front_default,
        moves:pok.moves,
        abilities:pok.abilities,
        types:pok.types
      })
    }
    fetchData()
  },[])
  return (
    <>
      <h2>
      {pokemon.name}
      </h2>

      <img src={pokemon.image} alt=""></img>
      <h2>Type</h2>
      <ul>
        {pokemon.types.map((type,index)=>{
          return <li key={index}>{type.type.name}</li>
        })}
      </ul>
      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map((ability,index)=>{
          return <li key={index}>{ability.ability.name}</li>
        })}
      </ul>
      <h2>Moves</h2>
      <ul>
        {pokemon.moves.map((move,index)=>{
          return <li key={index}>{move.move.name}</li>
        })}
      </ul>
    </>
  );
}

export default App;
