import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword ] = useState('')
    
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
    

// login.jsx
const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await login({ email, password }).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res })); // Corrected the spelling here
    } catch (err) {
        toast.error(err?.data?.message || err.message);
    }
};


    return (
    <div>
            <section className='pl-[10rem] flex flex-wrap'>
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font mb-10">Login</h1>
                
                <form onSubmit={submitHandler} className='w-[40rem]'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-white'>Email Address</label>

                            <input
                                type="email"
                                id="email"
                                className='mt-1 p-2 borde rounded w-full'
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>         
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-white'>Password</label>

                            <input
                                type="password"
                                id="password"
                                className='mt-1 p-2 borde rounded w-full'
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>     
                        
                        <button
                            disabled={isLoading}
                            type='submit'
                            className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </button>


                        <div className="mt-4">
                            <p className="text-white">
                                New Customer ? {" "}
                                <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>Register</Link>
                            </p>
                        </div>
                </form>
                </div>
          </section>
    </div>
  )
}

export default Login
