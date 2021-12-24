import styled, { css } from 'styled-components'
import {Color} from 'objs/Colors'

const CardContainer = styled.div`
    background-color: green;
    width:250px;
    height:350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius:10px;
    ${props =>
        props.color &&
        css`
          background: ${props.color};
         
        `};
`

const Sprite = styled.img`
    background-color: white;
    width:170px;
    border-radius:50%;
    display:flex;
    justify-content: center;
    align-items: center;
`
const IdNumber = styled.div`
    margin-top:20px;
    background:white;
    font-size:28px;
    padding:10px 50px;
    border-radius: 10px;
    color:black;
    `
    
    const PokemonName = styled.div`
    font-size:22px;
    margin-top:30px;
    text-transform:capitalize;
    color:black;
`
const PokemonCard = (props) => {
    return(
            <CardContainer color={Color[props.Type]}>
                <Sprite src={props.Image} alt=""></Sprite>
                <IdNumber>#{props.IdNumber}</IdNumber>
                <PokemonName>{props.Name}</PokemonName>
            </CardContainer>
    )
}


export { PokemonCard }