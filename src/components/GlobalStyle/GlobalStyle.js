import { useContext } from "react";
import { ThemeContext } from "contexts/theme-context";
import { createGlobalStyle,css } from 'styled-components'

const Global = createGlobalStyle`  
  
  *{
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    box-sizing: border-box;
  }

  a{
    text-decoration: none;
    color: var(--cor-branca);
  }

  ul{
    list-style: none;
  }

  img{
    max-width: 100%;
    
  }
  body {
    font-family: 'Press Start 2P', cursive;
    width:80%;
    margin: 0 auto;
    ${props => props.theme && css`
        background: ${props.theme.backgroundColor};
        color: ${props.theme.color};
    `}
    
  }
`
const GlobalStyle = () => {
	 const { theme } = useContext(ThemeContext);
	//  console.log('GlobalStyle',theme)
	return(
		<Global theme={theme}/>
	)
}

 export { GlobalStyle }