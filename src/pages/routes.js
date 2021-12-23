import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from 'pages/home'
import { PokeInfo } from 'pages/pokeInfo'

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/:name' element={<PokeInfo />}/>
        </Routes>
    </BrowserRouter>
)


export { AppRoutes }