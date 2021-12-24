import { useState, useEffect } from "react";
import styled from "styled-components";
import pokeTitleImage from "images/pokemon-logo.png";
import { PokemonCard } from "components/PokemonCard/PokemonCard";
import { Link } from "react-router-dom";
import { ThemeTogglerButton } from 'components/ThemeTogglerButton/ThemeTogglerButton';
import { ThemeProvider } from 'contexts/theme-context';
import { PokeTitle } from 'components/PokeTitle/PokeTitle'

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 50px;
`;

const LoadMoreButton = styled.button`
font-family: 'Press Start 2P', cursive;
padding:10px 15px;
border-radius:10px;
margin:20px auto;
display:block;
font-size:15px;
&:hover {
	cursor:pointer;
}
`;

const Description = styled.div`
  text-align: center;
  font-size:25px;
  margin-top:20px;
`
const PokemonHome = () => {
  const [allPokemon, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    // console.log(data)

    setLoadMore(data.next);

    const createPokemonObject = (results) => {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        // console.log(data);
        setAllPokemons((currentList) =>
          [...currentList, data].sort((a, b) => a.id - b.id)
        );
      });
    };
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
      <PokeTitle src={pokeTitleImage} alt="" />
      <Description>Simple Pokedex with pokeapi</Description>
      
      
        <ThemeTogglerButton />
      

      <Container>
        {allPokemon.map((pokemon,index) => (
          <Link to={`/${pokemon.name}`} key={index}>
            <PokemonCard
              Type={pokemon.types[0].type.name}
              IdNumber={pokemon.id}
              Image={pokemon.sprites.front_default}
              Name={pokemon.name}
            />
          </Link>
        ))}
      </Container>

      <LoadMoreButton onClick={() => getAllPokemons()}>
        Carregar Mais
      </LoadMoreButton>
    </>
  );
};

export { PokemonHome };
