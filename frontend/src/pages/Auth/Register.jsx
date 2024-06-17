import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'

// REDUX
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"

// TOAST
import { toast } from "react-toastify"

// IMAGE
import registerImage from '../../images/register.jpg'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector(state => state.auth)
    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])
    
    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Pass do not match")
        } else {
            try {
                const res = await register({ username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
                toast.success("User successfully registered")
            } catch (err) {
                console.log(err)
                toast.error(err.data.message) // err instead error
            }
        }
    }

    return (
        <section className="pl-[10rem] flex">
            <div className="mr-[4rem] mt-[5rem] w-1/2">
                <h1 className="text-4xl font-semibold mb-4">Register</h1>
                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Enter name"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoFocus />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="test@gmail.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
      
                    <button
                        className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                        disabled={isLoading}
                        type="submit">
                        {isLoading ? "Registering..." : "Register"}
                    </button>
      
                    <div className="mt-4">
                        <p className="text-white">
                            Already have an Account? {" "}
                            <Link
                                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                                className="text-pink-700 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <div className="mt-[11rem] w-1/2">
                <img
                    src={registerImage}
                    className="rounded" />
            </div>
        </section>
    )
}      

export default Register