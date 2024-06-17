import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'

// TOAST
import { toast } from 'react-toastify'

// IMAGE
import loginImage from '../../images/login.png'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector(state => state.auth)
    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);


    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    };


    return (
        <div>
            <section className='pl-[10rem] flex'>
                <div className="mr-[4rem] mt-[5rem] w-1/2">
                    <h1 className="text-4xl font mb-10">Login</h1>
      
                    <form onSubmit={submitHandler} className='w-[40rem]'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-white'>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                autoFocus
                                className='mt-1 p-2 border rounded w-full'
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='password' className='block mt-4 text-sm font-medium text-white'>Password</label>
                            <input
                                type="password"
                                id="password"
                                className='mt-1 p-2 border rounded w-full'
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
      
                        <button
                            disabled={isLoading}
                            type='submit'
                            className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
                            {isLoading ? "Loading..." : "Login"}
                        </button>
      
                        <div className="mt-4">
                            <p className="text-white">
                                New Customer? {" "}
                                <Link to={redirect ? `/register` : '/register'} className='text-pink-700 hover:underline'>Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className='w-1/2 mt-[11rem]'>
                    <img
                        src={loginImage}
                        className='w-auto h-auto rounded' />
                </div>
            </section>
        </div>
    )
}

export default Login
