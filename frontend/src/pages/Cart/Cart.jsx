import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../redux/features/cart/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const Navigate = useNavigate()

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const checkoutHandler = () => {
        Navigate('/login?redirect=/shipping')
    }


    return (
        <div className="container mx-auto mt-8 ml-40">
            {cartItems.length === 0 ? (
                <div className="text-center">
                    Your cart is empty. <Link to='/shop' className="text-sky-600">Go Back</Link>
                </div>
            ) : (
                <div>
                    <h1 className="text-3xl font-semibold mb-4">Shopping Cart:</h1>
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {cartItems.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                                <img src={item.image} alt={item.name} className="w-60  object-cover rounded-md mx-auto mb-4" />
                                <div className="text-center">
                                    <Link to={`/product/${item._id}`} className='text-pink-500 font-semibold text-xl'>{item.name}</Link>
                                </div>
                                <div className="flex justify-between mt-2 mb-2">
                                    <span className="text-gray-600 font-bold hover:underline">Quantity: {item.quantity}</span>
                                    <span className="text-gray-600 font-bold hover:underline">Brand: {item.brand}</span>
                                    <span className="text-gray-600 font-bold hover:underline ">Price: $ {item.price}</span>

                                    <button
                                        className="text-red-500 focus:outline-none"
                                        onClick={() => dispatch(removeFromCart(item._id))}
                                    >
                                        <FaTrash />
                                    </button>
                                                                   
                                </div>
                                <span className="text-gray-600 font-bold hover:underline ">{item.description}</span>
                                <div className="w-24 mt-2">
                                    <select className="w-full p-1 border rounded text-black font-bold" value={item.qty} onChange={e => addToCartHandler(item, Number(e.target.value))}>
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 w-[40rem]">
                        <div className="p-4 rounded-l">
                            <h2 className="text-xl font-semibold mb-2">
                                Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            </h2>

                            <div className="text-2xl font-bo">
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </div>
                            <button 
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                    className='bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full text-gray-200'>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
