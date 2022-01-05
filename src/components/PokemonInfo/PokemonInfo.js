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
  margin: 25px;
`;

const DescriptionBox = styled.div`
  display: flex;
  gap: 50px;
  border: 10px solid black;
  border-radius: 10px;
  padding: 10px;
  ${(props) =>
    props.cardColor &&
    css`
      background: ${props.cardColor};
    `}
`;

const PokeImg = styled.img`
  width: 380px;
  height: 380px;
`;

const AbilityCard = styled.div`
  border: 10px solid black;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  ${(props) =>
    props.color &&
    css`
      background: ${props.color};
    `}
`;

const MovesList = styled.ul`
overflow: auto; 
height: 250px; 
margin-top: 10px;
margin-bottom:20px; 
padding: 10px;
border: 10px solid black;
border-radius: 10px;
text-align:center;
${(props) =>
  props.color &&
  css`
    background: ${props.color};
  `}
`;
const PokemonInfo = () => {
  const [pokemon, setPokemon] = useState({});
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [abilityDesc, setAbilityDesc] = useState([]);
  const [description, setDescription] = useState({});
  const [image, setImage] = useState("");
  const [moves, setMoves] = useState([]);
  const { name } = useParams();
  const { theme } = useContext(ThemeContext);

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

  const getAbilityDescription = async (url) => {
    const res = await fetch(`${url}`);
    const data = await res.json();

    let abilityObj = {};
    data.effect_entries.find((entry) => {
      if (entry.language.name === "en") {
        abilityObj.description = entry.effect;
      }
    });
    abilityObj.name = data.name;
    console.log(abilityObj);
    setAbilityDesc((currentList) => [...currentList, abilityObj]);
  };

  const getPokemonByName = async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();

    console.log(data);
    setPokemon(data);
    setImage(data.sprites.other["official-artwork"].front_default);
    setTypes(data.types);
    setAbilities(data.abilities);
    data.abilities.map((entry) => {
      getAbilityDescription(entry.ability.url);
    });
    setMoves(data.moves);
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
      <div>
        <ThemeTogglerButton />
        <Link to="/">Voltar</Link>
      </div>

      <SubTitle>Type</SubTitle>
      <FlexContainer>
        {types.map((type, index) => (
          <TypeButton type={type.type.name} key={index}>
            {type.type.name.toUpperCase()}
          </TypeButton>
        ))}
      </FlexContainer>

      <FlexContainer>
        <PokeImg pokemon={pokemon} src={image} alt="" />
        <div className="description">
          <h2>Description</h2>
          <p>{description.flavor_text}</p>
          <DescriptionBox
            cardColor={theme.cardColor}
            className="description-box"
          >
            <div>
              <h3>Height</h3>
              <p>{pokemon.height}m</p>
              <h3>Weight</h3>
              <p>{pokemon.weight}kg</p>
            </div>
            <div>
              <h3>Abilities</h3>
              {abilities.map((ability, index) => (
                <p key={index}>{ability.ability.name}</p>
              ))}
            </div>
          </DescriptionBox>
        </div>
      </FlexContainer>
      {abilityDesc.map((desc, index) => (
        <AbilityCard key={index} color={theme.abilityColor}>
          <h3>{desc.name.toUpperCase()}</h3>
          <br />
          {desc.description}
        </AbilityCard>
        // console.log(desc.name)
      ))}

      <h3 style={{ marginTop: 20, textAlign:'center' }}>Moves</h3>
      <MovesList color={theme.abilityColor}>
        {moves.map((entry, index) => (
          <li style={{marginBottom:10}} key={index}>{entry.move.name}</li>
        ))}
      </MovesList>
    </>
  );
};

export { PokemonInfo };
