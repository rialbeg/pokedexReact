import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";

const PokeInfo = () => {
	const [pokemon,setPokemon] = useState({})

	const { name } = useParams()

	const getPokemonByName = async (name) => {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    	const data = await res.json();
		console.log(data)
		return data
	}
	
	useEffect(() => {
		async function fetchData(){
			const pokemon = await getPokemonByName(name)
			setPokemon(pokemon)

			// console.log(pokemon)
		}
		fetchData()
	},[])
	return (
		<>
			<h1>PokeInfo</h1>
			<h2>{pokemon.name}</h2>
		</>
	)
}

export { PokeInfo }