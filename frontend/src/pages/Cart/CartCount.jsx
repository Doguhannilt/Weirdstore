import { useDispatch, useSelector } from "react-redux"

const CartCount = () => {

    const cart = useSelector(state => state.cart)
    const CartCount = cart.cartItems.length
    console.log(cart)
    return (
        <div className="s">{CartCount > 0 && (
            <span className='px-1 py-0 text-sm text-white bg-pink-500 rounded-full'>
                {CartCount}
            </span>
        ) }</div>
    )
  }

export default CartCount