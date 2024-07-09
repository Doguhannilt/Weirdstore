import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Message from "./components/Message";
import Product from "./pages/Products/Product";
import HeartIcon from "./pages/Products/HeartIcon";

const Home = () => {
    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });


    return (
        <div className="container mx-auto px-4 py-8">
            {!isLoading ? (
                isError ? (
                    <Message variant='danger'>
                        {isError?.data.message || isError.error}
                    </Message>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-6">Products</h1>
                        <div className="flex justify-between items-start mb-8">
                            <Link to='/shop' className="bg-pink-600 text-white font-bold rounded-full py-2 px-6">
                                Shop
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.products.map((product) => (
                                <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                                    <Product product={product} />
                                    <div className="p-4">
                                        <Link to={`/products/${product._id}`} className="block">
                                            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                        </Link>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700">${product.price}</span>
                                            <HeartIcon product={product} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </div>
    );
};
export default Home;
