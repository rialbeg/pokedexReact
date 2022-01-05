import { createContext, useState } from "react";
import Lunatone from 'images/lunatone.png';
import Solrock from 'images/solrock.png';

export const themes = {
	light:{
		color:'#000000',
		backgroundColor:'#64C1DB',
		icon:Lunatone,
		cardColor:'#A0EF7B',
		abilityColor:'#96DCF0'
	},
	dark:{
		color:'#ffffff',
		backgroundColor:'#1E2641',
		icon:Solrock,
		cardColor:'#4A4B85',
		abilityColor:'#1C201E'
	}
}
export const ThemeContext = createContext({})



export const ThemeProvider = (props) => {
	const [theme,setTheme] = useState(localStorage.getItem('theme') === 'dark'? themes.dark: themes.light)
	return (
		<ThemeContext.Provider value={{theme,setTheme}}>
			{props.children}
		</ThemeContext.Provider>
	)
}