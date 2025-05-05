import {Routes, Route, Outlet} from 'react-router-dom'

import Home from './routes/home/home.component.jsx'
import Navigation from './routes/navigation/navigation.component.jsx'
import Authentication from './routes/navigation/authentication/authentication.component.jsx'

const Shop = () => {
    return <h1> shop</h1>
}

const App = () => {

    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/auth' element={<Authentication />} />
            </Route>
        </Routes>
    )
};

export default App;