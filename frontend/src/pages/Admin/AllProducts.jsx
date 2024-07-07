import { FaMonument } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from 'moment';
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
    const { data: products, isLoading, isError } = useAllProductsQuery();

    if (isLoading) {
        return 'Loading...';
    }

    if (isError) {
        return 'Error loading products';
    }

    return (
        <div className="container mx-[9rem]">
            <div className="flex flex-col md:flex-row">
                <div className="p-3">
                    <div className="ml-2rem text-xl font-bold h-12">All Products ({products.length})</div>
                </div>
            </div>
            <div className="flex flex-wrap justify-around items-center mt-4">
                {products.map((product) => (
                    <Link key={product._id} to={`admin/product/update/${product._id}`} className="block mb-4 overflow-hidden bg-white rounded-lg shadow-md w-full">
                        <div className="flex">
                            <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-l-lg"/>
                            <div className="p-4 flex flex-col justify-between">
                                <div className="flex justify-between mb-2">
                                    <div className="text-xl font-semibold">{product.name}</div>
                                    <p className="text-gray-400 text-sm">{moment(product.createAt).format("MMMM Do YYYY")}</p>
                                </div>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <Link to={`/admin/product/update/${product._id}`} className="inline-block px-4 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800">
                                        Update Product
                                    </Link>
                                    <p className="text-lg font-semibold text-gray-800">${product.price}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="md:w-1/4 px-3 mt-2">
                <AdminMenu />
            </div>
        </div>
    );
};

export default AllProducts;
