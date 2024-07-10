import React from 'react'
import { useState } from 'react'

// ICONS
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart
} from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// REDUX
import {
    useSelector,
    useDispatch
} from 'react-redux'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { logout } from '../../redux/features/auth/authSlice'

// Config
import { userInfoAdmin } from '../../utils/config'
import FavoriteCount from '../Products/FavoriteCount'
import CartCount from '../Cart/CartCount'

const Navigation = () => {
    const { userInfo } = useSelector(state => state.auth)

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    const closeSidebar = () => {
        setShowSidebar(false)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div
            style={{ zIndex: 999 }}
            className={`${showSidebar ? "hidden" : 'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[6%] hover:w-[12%] h-[100vh]  fixed `}>

            <div className="flex flex-col justify-center space-y-4">
                <Link to='/' className='flex items-center transition-transform tansform hover:translate-x-2'>
                    <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
                    <span className='mt-12'>Home</span>
                </Link>
                <Link to='/shop' className='flex items-center transition-transform tansform hover:translate-x-2'>
                    <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
                    <span className='mt-12'>Shop</span>
                </Link>
                <Link to='/cart' className='flex items-center transition-transform tansform hover:translate-x-2'>
                    <AiOutlineShoppingCart className='mr-2 mt-[3rem] text-white' size={26} />
                    <span className='mt-12'>Cart</span>
                    <CartCount />
                </Link>
                <Link to='/favorite' className='flex items-center transition-transform tansform hover:translate-x-2 '>
                    <FaHeart className='mr-2 mt-[3rem]' size={26} />
                    <span className='mt-12'>Favs</span>
                    <FavoriteCount />
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className='flex items-center text-gray-8000 focus:outline-none'>
                    
                    {userInfo ? (
                        <span className='text-white font-bold text-xl'>{userInfo.username}</span>
                    ) : (<></>)}


                        {/* SVG */}
                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='white'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth="2"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            />
                        </svg>


                    )}
                </button>
                {dropdownOpen && userInfo && (
                    <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
                        {userInfo && userInfo.isAdmin ? (
                            <>
                                <li>
                                    <Link to='/login'
                                        onClick={logoutHandler}
                                        className='block px-4 hover:bg-gray-200'>Logout</Link>
                                </li>

                                {userInfoAdmin.map((item) => (
                    <li key={item.URL}>
                        <Link to={item.URL}
                              className={item.STYLE}>
                            {item.NAME}
                        </Link>
                    </li>
                                ))}
                            </>)
                            :
                            (
                                <>
                                    <li>
                                        <Link to='/profile'
                                            className='block px-4 py-2 hover:bg-gray-200'>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/'
                                            onClick={logoutHandler}
                                            className='block px-4 py-2 hover:bg-gray-200'>
                                            Logout
                                        </Link>
                                    </li>
                                </>
                            )}
                    </ul>
                )}
            </div>

            {!userInfo && (
                <ul>
                    <li>
                        <Link to='/login'
                            className='flex items-center transition-transform tansform hover:translate-x-2'>
                            <AiOutlineLogin
                                className='mr-2 mt-[3rem]'
                                size={26} />
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'
                            className='flex items-center transition-transform tansform hover:translate-x-2'>
                            <AiOutlineUserAdd
                                className='mr-2 mt-[3rem]'
                                size={26} />
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Navigation
