import { useState, useEffect } from "react";
import {
  PokemonCard,
  Container,
  PokeTitle,
  LoadMore,
} from "components/PokemonCard/PokemonCard";
import pokeTitle from "images/pokemon-logo.png";
import { Link } from "react-router-dom";

const Home = () => {
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
      <PokeTitle src={pokeTitle} alt="" />
      <Container>
        {allPokemon.map((pokemon) => (
          <Link to={`/${pokemon.name}`}>
            {/* <div>{pokemon.id}</div>
          <img src={pokemon.sprites.front_default} alt="" />
          <div>{pokemon.name}</div> */}

            <PokemonCard
              Type={pokemon.types[0].type.name}
              IdNumber={pokemon.id}
              Image={pokemon.sprites.front_default}
              Name={pokemon.name}
            />
          </Link>
        ))}
      </Container>

      <LoadMore onClick={() => getAllPokemons()}>Carregar Mais</LoadMore>
    </>
  );
};

export { Home };
