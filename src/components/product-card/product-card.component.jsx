
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

import { useDispatch, useSelector } from 'react-redux'

import { addItemToCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'


import './product-card.styles.scss'

const ProductCard = ({product}) => {
    const {name, price, imageUrl } = product
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const { addItemToCart} = dispatch(addItemToCart(product))

    const addProductToCart = () => addItemToCart(product);

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className ='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
        </div>
    )
}

export default ProductCard