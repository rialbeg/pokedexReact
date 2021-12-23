import styled, { css } from 'styled-components'
import {Color} from 'objs/Colors'


const Container = styled.div`
        display:flex;
        justify-content: center;
        flex-wrap: wrap;
        gap:20px;
        padding:50px;
`
const PokeTitle = styled.img`
    width:600px;
    margin:0 auto;
    display:block;
    padding:20px 20px 0 20px;
`

const Card = styled.div`
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
`

const PokemonName = styled.div`
    font-size:22px;
    margin-top:30px;
    text-transform:capitalize;
`

const LoadMore = styled.button`
        padding:10px 15px;
        border-radius:10px;
        margin:20px auto;
        display:block;
        font-size:30px;
        &:hover {
            cursor:pointer;
        }
` 
const PokemonCard = (props) => {
    return(
            <Card color={Color[props.Type]}>
                <Sprite src={props.Image} alt=""></Sprite>
                <IdNumber>#{props.IdNumber}</IdNumber>
                <PokemonName>{props.Name}</PokemonName>
            </Card>
    )
}


export { PokemonCard,Container,PokeTitle,LoadMore }