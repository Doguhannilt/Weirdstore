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
                        <h2 className="text-2xl font-semibold-mb-4 text-center font-bold mb-4">
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
                            </div>
                        </form>
                    </div>
                    {loadingUpdateProfile}
                </div>
                <div className="flex flex-row text-center justify-center content-center">

                    <div className='flex-1'>
                        <div
                            className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
                            <div
                                className="border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10 underline">
                                Your Current Profile
                            </div>
                            <div className="p-6">
                                <h5
                                    className="mb-2 text-xl font-medium leading-tight">
                                    {userInfo.email}
                                </h5>
                                <p className="mb-4 text-base">
                                   <span className = 'font-bold'>Username:</span> {userInfo.username}
                                </p>
                                <p class="mb-4 text-base">
                                  <span className= 'font-bold'>Password:</span> ●●●●●●●●●●●●
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-
        </div>
    )
}

export default Profile