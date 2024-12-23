import { useSelector } from "react-redux"
import { selectFavoriteProduct } from "../../redux/features/favorites/favoritesSlice"
import Product from "./Product"
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";



const Favorites = () => {

    const favorites = useSelector(selectFavoriteProduct)

    return (
        <div className="ml-[10rem]">
            <h1 className=" font-bold ml-[3rem] mt-[3rem] text-center text-2xl ">
                FAVORITE PRODUCTS ({favorites.length})
            </h1>

            <div className="flex flex-wrap">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {favorites.map((product) => (
                        <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-gray-400 border-neutral-300  border shadow-xl ">
                            <div className="w-[30rem]  p-3 relative ">
                                <div className="flex justify-center text-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className=" rounded relative"
                                    />

                                </div>
                            </div>
                            <div className="p-4">
                                <Link to={`/products/${product._id}`} className="block">
                                    <h2 className="text-lg font-bold mb-2 ">{product.name}</h2>
                                </Link>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">${product.price}</span>
                                    <HeartIcon product={product} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favorites;