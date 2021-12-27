import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeTogglerButton } from "components/ThemeTogglerButton/ThemeTogglerButton";
import { ThemeContext } from "contexts/theme-context";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { TypeButton } from "components/TypeButton/TypeButton";
import "./PokemonInfo.css";

const Title = styled.h1`
  margin-top: 100px;
  text-align: center;
`;
const SubTitle = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px;
`;

const DescriptionBox = styled.div`
  display: flex;
  gap: 50px;
  border: 10px solid black;
  border-radius: 10px;
  padding: 10px;
  ${props => props.cardColor && css`
        background: ${props.cardColor};
  `}
  
`;

const PokemonInfo = () => {
  const [pokemon, setPokemon] = useState({});
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [description, setDescription] = useState({});
  const [image, setImage] = useState("");
  const { name } = useParams();
  const { theme, setTheme } = useContext(ThemeContext);
  
  
  const getPokemonDescription = async (url) => {
    const res = await fetch(`${url}`);
    const data = await res.json();
    // console.log(data.flavor_text_entries);

    let desc = "";
    data.flavor_text_entries.find((entry) => {
      if (entry.language.name === "en") {
        desc = entry;
      }
    });
    setDescription(desc);
  };

  const getPokemonByName = async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();

    console.log(data);
    setPokemon(data);
    setImage(data.sprites.other["official-artwork"].front_default);
    setTypes(data.types);
    setAbilities(data.abilities);
    getPokemonDescription(data.species.url);
  };
  useEffect(() => {
    getPokemonByName(name);
  }, []);
  return (
    <>
      <Title>
        {name.toUpperCase()} | Nº{pokemon.id}
      </Title>
      <SubTitle>Type</SubTitle>

      <div>
        <ThemeTogglerButton />
        <Link to="/">Voltar</Link>
      </div>
      <FlexContainer>
        {types.map((type, index) => (
          <TypeButton type={type.type.name} key={index}>
            {type.type.name.toUpperCase()}
          </TypeButton>
        ))}
      </FlexContainer>

      <FlexContainer>
        <img className="poke-img" src={image} alt="" />
        <div className="description">
          <h2>Description</h2>
          <p>{description.flavor_text}</p>
          <DescriptionBox cardColor={theme.cardColor} className="description-box">
            <div>
              <h3>Height</h3>
              <p>{pokemon.height}</p>
              <h3>Weight</h3>
              <p>{pokemon.weight}</p>
            </div>
            <div>
              <h3>Abilties</h3>
              {abilities.map((ability, index) => (
                <p key={index}>{ability.ability.name}</p>
              ))}
            </div>
          </DescriptionBox>
        </div>
      </FlexContainer>
    </>
  );
};

export { PokemonInfo };
