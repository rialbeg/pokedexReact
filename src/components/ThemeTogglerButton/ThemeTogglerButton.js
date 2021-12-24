import { useContext, useState } from "react"
import { ThemeContext,themes } from "contexts/theme-context"
import { ThemeButton } from "components/ThemeButton/ThemeButton"
import styled from 'styled-components'

const Icon = styled.img`
	text-align:center;
	width:50px;
	position:absolute;
	right:30px;
	cursor:pointer;
`

const ThemeTogglerButton = () => {
	
	const {theme,setTheme} = useContext(ThemeContext)

	
	return(
		<div>
			<ThemeButton onClick={() => {
				theme === themes.light ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme','light')
				setTheme(theme === themes.light ? themes.dark : themes.light)
			}}><Icon src={theme.icon} alt=""/></ThemeButton>
		</div>
	)
}


export { ThemeTogglerButton }