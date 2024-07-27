import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    useCreateReviewMutation,
    useGetProductDetailsQuery
} from '../../redux/api/productApiSlice';
import Message from '../../components/Message';
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore
} from 'react-icons/fa';
import moment from 'moment';
import HeartIcon from './HeartIcon';
import Ratings from './Ratings';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
    const { userInfo } = useSelector(state => state.auth);
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    console.log(product)
    const addToCartHandler = async () => {
        dispatch(addToCart({ ...product, qty }))
        console.log(addToCart)
        navigate('/cart')
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            await createReview({
                productId, rating, comment
            }).unwrap()

            refetch()
            toast.success('Review created successfully')
        } catch (error) { 
            toast.error(error?.data || error.message)
        }
    }

    return (
        <div className="container mx-auto px-4">
            <Link to='/' className='text-blue-500 font-semibold hover:underline mb-4 inline-block'>
                &lt; Go back
            </Link>

            {isLoading ? (
                <p className="text-center mt-10">Loading...</p>
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-8">
                    <div className="flex flex-col">
                        <img
                            src={product.image}
                            alt={product.name}
                            className='rounded-lg shadow-lg mb-4 w-[40rem] h-[40rem] ml-10'
                        />
                        <HeartIcon product={product} />
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
                        <p className="text-lg text-gray-700 mb-4">${product.price}</p>
                        <p className="mb-4">{product.description}</p>
                        <div className="flex items-center mb-4">
                            <p className="text-lg text-gray-700"><span className='font-bold'>Brand:</span> {product.brand}</p>
                        </div>
                        <p className="mb-4 text-gray-700"><span className='font-bold'>Rating:</span> {product.rating}</p>
                        <p className="mb-4 text-gray-700"><span className='font-bold'>Quantity:</span> {product.quantity}</p>
                        <p className="mb-4 text-gray-700"><span className='font-bold'>In Stock:</span> {product.countInStock}</p>

                        <div className="flex items-center mb-4">
                            <FaClock className="text-gray-600 mr-1" />
                            <span className="text-gray-600">{moment(product.createdAt).format('LL')}</span>
                        </div>
                        <Ratings
                            value={product.rating}
                            text={`${product.numReview} reviews`}
                        />

                        {product.countInStock > 0 && (
                            <div>
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    className='p-2 w-[6rem] rounded-lg mb-2 mt-2'
                                >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button
                            className="bg-blue-500 text-white py-2 mt-2 mb-4 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                        >
                            <FaShoppingCart className="inline-block mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}

            <section className="mt-8">
                <div className="ml-[20rem] text-2xl font-bold mb-4">
                    REVIEWS
                </div>

                <div className="ml-[20rem]">
                    {product?.reviews?.length === 0 && <p>No Reviews</p>}
                </div>

                <div>
                    {product?.reviews?.map((review) => (
                        <div key={review._id} className="ml-[20rem] w-[45rem] mt-6 bg-gray-100 rounded-lg shadow-md p-4">
                            <div className="flex justify-between mb-2">
                                <strong className="text-lg font-semibold text-gray-800">{review.name} - ({review.rating} Stars)</strong>
                                <span className="text-gray-500">{moment(review.createdAt).format('LL')}</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>

                <p className="ml-[20rem] mt-8 text-gray-500">Nothing else</p>
            </section>

            <section className="mt-8">
                {userInfo ? (
                    <form onSubmit={submitHandler} className="ml-[20rem]">
                        <div className="flex gap-2 flex-col self-center  object-center">
                            <div>
                                <label htmlFor="comment" className="block text-lg mb-2">Comment</label>
                                <textarea
                                    id="comment"
                                    rows="3"
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="border p-2 rounded-lg w-full"
                                ></textarea>
                            </div>
                      

                            <div>
                            <label htmlFor="rating" className="block text-lg mb-2">Rating</label>
                                <select
                                    id="rating"
                                    required
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="border p-2 rounded-lg"
                                >
                                    <option value="">Select</option>
                                    <option value="1">1 - Inferior</option>
                                    <option value="2">2 - Decent</option>
                                    <option value="3">3 - Great</option>
                                    <option value="4">4 - Excellent</option>
                                    <option value="5">5 - Exceptional</option>
                                </select>
                            </div>
                        </div>
                        

                        <button
                            type="submit"
                            disabled={loadingProductReview}
                            className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4   "
                        >
                            Submit
                        </button>
                    </form>
                ) : (
                    <p className="ml-[20rem] mt-4 text-gray-700">Please <Link to="/login" className="text-blue-500">sign in</Link> to write a review.</p>
                )}
            </section>
        </div>
    );
}

export default ProductDetails;
