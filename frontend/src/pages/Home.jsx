import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Message from "../components/Message";
import Product from "./Products/Product";
import HeartIcon from "./Products/HeartIcon";

const Home = () => {
    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });


    return (
        <div className="container mx-auto ml-40 px-4 py-8 bg-white ">
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
                        <div className="grid md:grid-cols-3 gap-6">
                            {data.products.map((product) => (
                                <div key={product._id} className="rounded-lg overflow-hidden  shadow-2xl shadow-slate-400 border-neutral-400 py-4">
                                    <Product product={product} />
                                    <div className="">
                                        <Link to={`/products/${product._id}`} className="block">
                                            <h2 className="text-lg font-bold mb-2 ml-4">{product.name}</h2>
                                        </Link>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 ml-4">${product.price}</span>
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
