import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, setFavorites } from '../../redux/features/favorites/favoritesSlice';
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from '../../utils/localStorage';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const HeartIcon = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites) || [];
    
    const [isFavorite, setIsFavorite] = useState(favorites.some((p) => p._id === product._id));

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));

        setIsFavorite(favorites.some((p) => p._id === product._id));
    }, []);

    const toggleFavorites = () => {
        const isCurrentlyFavorite = favorites.some((p) => p._id === product._id);
        if (isCurrentlyFavorite) {
            dispatch(removeFromFavorites(product));
            removeFavoriteFromLocalStorage(product._id);
            toast.success('This product is removed')
        } else {
            dispatch(addToFavorites(product));
            addFavoriteToLocalStorage(product);
            toast.success('This product is added to your favorites')
        }
        
        setIsFavorite(!isCurrentlyFavorite);
    }

    return (
        <div className='top-2 right-5 cursor-pointer'>
            {isFavorite ? (
                <FaHeart
                    onClick={toggleFavorites}
                    className='text-pink-500'
                />
            ) : (
                <FaRegHeart
                    onClick={toggleFavorites}
                    className='text-pink-900'
                />
            )}
        </div>
    );
}

export default HeartIcon;
