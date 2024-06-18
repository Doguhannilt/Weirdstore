import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/usersApiSlice"


const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector(state => state.auth)
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()
    
    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
        console.log(userInfo.email)
        
    }, [userInfo.email, userInfo.username])

    const dispatch = useDispatch()


    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Pass do not match')
        }
        else {
            try {
                const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success('Profile Updated Successfully')
            } catch (err) {
                toast.error(err?.data?.message || err.message)
            }
        }
    }

    return (
    <div>
            <div className="container mx-auto p-4">
                <div className="div flex justify-center align-center md:flex md:space-x-4">
                    <div className="div md:w-1/3">
                    <h2 className="text-2xl font-semibold-mb-4">
                        UPDATE PROFILE
                    </h2>

                    <form onSubmit={submitHandler}>
                        <div className="div mb-4">
                            <label
                                className="block text-white mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                className="form-input p-4 rounded-sm w-full"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="div mb-4">
                            <label
                                className="block text-white mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-input p-4 rounded-sm w-full"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="div mb-4">
                            <label
                                className="block text-white mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="form-input p-4 rounded-sm w-full"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="div mb-4">
                            <label
                                className="block text-white mb-2">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="form-input p-4 rounded-sm w-full"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            </div>
                            
                            <div className="flex justify-between">
                                <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
                                    Update
                                </button>

                                <Link to='/user-orders' className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-ping-700">
                                    My Orders
                                </Link>
                            </div>
                    </form>
                    </div>    
                    {loadingUpdateProfile}
            </div>
            </div>-        
    </div>
  )
}

export default Profile