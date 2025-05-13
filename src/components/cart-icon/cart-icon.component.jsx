import { CartContext } from '../../context/cart.context'
import { useContext } from 'react'
import {ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx'

import './cart-icon.styles.jsx'

const CartIcon = () => {
    const {isCartOpen,setIsCartOpen, cartCount } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon