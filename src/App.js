import {Routes, Route, Outlet} from 'react-router-dom'

import Home from './routes/home/home.component.jsx'
import Navigation from './routes/navigation/navigation.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx'
import Shop from './routes/shop/shop.component.jsx'
import Checkout from './routes/checkout/checkout.component.jsx'
import { useEffect } from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener, getCurrentUser } from './utils/firebase/firebase.utils.js'
import { setCurrentUser } from './store/user/user.action.js'
import { useDispatch } from 'react-redux'
import { checkUserSession } from './store/user/user.action.js'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUserSession())
    }, [])

    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>} />
                <Route path='/shop/*' element={<Shop />} />
                <Route path='/auth' element={<Authentication />} />
                <Route path='/checkout' element={<Checkout/>}/>
            </Route>
        </Routes>
    )
};

export default App;