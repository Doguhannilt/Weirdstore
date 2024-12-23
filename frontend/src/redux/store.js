import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'
import favoritesReducer from '../redux/features/favorites/favoritesSlice'
import { getFavoritesFromLocalStorage } from "../utils/localStorage";
import cartSliceReducer from '../redux/features/cart/cartSlice'
import shopReducer from '../redux/features/shop/shopSlice'

const initalFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartSliceReducer,
        shop: shopReducer
    },

    preloadedState: {
        favorites: initalFavorites
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
export default store