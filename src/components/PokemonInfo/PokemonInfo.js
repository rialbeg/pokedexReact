import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import { ThemeTogglerButton } from 'components/ThemeTogglerButton/ThemeTogglerButton';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TypeButton } from "components/TypeButton/TypeButton";


const Title = styled.h1`
	margin-top:100px;
`
const SubTitle = styled.h2`
	text-align:center;
	margin-top:20px;
`
const PokemonInfo = () => {
	const [pokemon,setPokemon] = useState({})
	const [types,setTypes] = useState([])
	const { name } = useParams()

	const getPokemonByName = async (name) => {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    	const data = await res.json();
		
		console.log(data)
		setPokemon(data)
		
		setTypes(data.types)
	}
	useEffect(() => {
		getPokemonByName(name)
	},[])
	return (
		<>
			
			<Title>{name.toUpperCase()} | Nº{pokemon.id}</Title>
			<SubTitle>Type</SubTitle>

			<div style={{display: 'flex',justifyContent: 'center',margin:'10px'}}>
				{types.map((type,index) => <TypeButton type={type.type.name} key={index}>{type.type.name.toUpperCase()}</TypeButton>)}
			</div>
			
			<Link to="/" ><div style={{position: 'absolute',left:'30px',top:'100px'}}>Voltar</div></Link>
			<ThemeTogglerButton />
		</>
	)
}

export { PokemonInfo }