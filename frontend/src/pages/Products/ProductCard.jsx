import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { toast } from 'react-toastify'
import HeartIcon from './HeartIcon'

const ProductCard = ({ p }) => {
    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
        toast.success('Product added successfully')
        console.log(product)
    }

    const dispatch = useDispatch();
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <Link to={`/products/${p._id}`} className="block relative">
                <img
                    src={p.image} 
                    alt={p.name}
                    className="object-cover w-full h-52 cursor-pointer hover:h-56 hover:duration-300 duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 shadow  bg-opacity-50 text-white px-4 py-2">
                    <h3 className="text-xl text-pink-500  font-bold">{p.name}</h3>
                    <span className="text-sm text-pink-500  font-medium">{p.brand}</span>
                    <span className="text-sm text-pink-500  font-medium"> - ${p.price}</span>
                    <HeartIcon product={p} />
                </div>
            </Link>

            <div className='flex justify-between'>
                <button
                    className='p-2 rounded-full'
                    onClick={() => addToCartHandler(p, 1)}
                >
                    <AiOutlineShoppingCart size={25} />
                </button>

                <Link to={`/products/${p._id}`}>
                    <button
                        className='bg-pink-500 rounded-lg text-gray-300 px-2 py-2 mt-2 mr-2 mb-2 hover:bg-pink-700 duration-300'
                    >
                        More Details
                    </button>
                </Link>
            </div>
        </div>
    );

}
export default ProductCard