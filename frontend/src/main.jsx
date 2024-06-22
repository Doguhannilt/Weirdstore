import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

// PAGES
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'

//REDUX
import { Provider } from 'react-redux'
import store from './redux/store.js'

// PROTECTED ROUTE
import ProtectedRoute from './components/ProtectedRoute.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >

      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route path='' element={<ProtectedRoute />} >
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin */}
      <Route path='/admin' element={<AdminRoute/>}>
        <Route path='userlist' element={<UserList />} />  
        <Route path='categorylist' element={<CategoryList/>} />
      </Route>
      
    </Route>
    
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= {store} >
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
)
