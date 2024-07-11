import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'


// PROTECTED ROUTE 
import ProtectedRoute from './components/ProtectedRoute.jsx'

// PAGES
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import UserList from './pages/Admin/UserList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Shop from './pages/Shop/Shop.jsx'


//REDUX
import { Provider } from 'react-redux'
import store from './redux/store.js'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='/favorite' element={<Favorites />} />
      <Route path='/products/:id' element={<ProductDetails />} />
      <Route path='cart' element={<Cart />} />
      <Route path='shop' element={<Shop />}  
      />

      <Route path='' element={<ProtectedRoute />} >
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin */}
      <Route path='/admin' element={<AdminRoute />}>
        <Route path='userlist' element={<UserList />} />
        <Route path='categorylist' element={<CategoryList />} />
        <Route path='productlist/:pageNumber' element={<ProductList />} />
        <Route path='allproducts' element={<AllProducts />} />
        <Route path='product/update/:_id' element={<ProductUpdate />} />
      </Route>

    </Route>


  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
