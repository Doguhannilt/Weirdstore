import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
    FaTrash,
    FaEdit,
    FaCheck,
    FaTimes
} from 'react-icons/fa'
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} from '../../redux/api/usersApiSlice'
import Message from "../../components/Message"
import AdminMenu from "./AdminMenu"



const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')

    useEffect(() => {
        refetch()
    }, [refetch])


    const deleteHandler = async (id) => {
        if (window.confirm('Are you Sure?')) {
            try {
                await deleteUser(id)
             
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    }

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id)
        setEditableUserName(username)
        setEditableUserEmail(email)
    }

    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUserName,
                email: editableUserEmail
            })

            setEditableUserId(null)
       
        

        } catch (error) {
            toast.error(error.data.message | error.error)
        }
    }
 
  return (
      <div className="p-4">
          {isLoading ? 'Loading' : error ? (<Message variant='danger'>{error?.data.message || error}</Message>):(
            <div className="flex flex-col md:flex-row">
                  { /* Admin Menu */}
                  <AdminMenu />

                  <div className="table w-full md:w-4/5 mx-auto">
                      <thead>
                          <tr>
                              <th className="px-4 py-2 text-left">ID</th>
                              <th className="px-4 py-2 text-left">NAME</th>
                              <th className="px-4 py-2 text-left">EMAIL</th>
                              <th className="px-4 py-2 text-left">ADMIN</th>
                          </tr>
                      </thead>
                      <tbody>
                          {users.map(user => (
                              <tr key={user._id}>
                                  <td className="px-4 py-2">{user._id}</td>
                                  <td className="px-4 py-2">
                                      {editableUserId === user._id ? (
                                          <div className="items-center">
                                              <input type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)} className="border rounded-lg" />
                                              <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-2 rounded-lg">
                                                  <FaCheck/>
                                          </button>
                                          </div>
                                      ) : (
                                              <div className="flex items-center">
                                                  {user.username} {" "}
                                                  <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                      <FaEdit className="ml-[1rem]" />
                                                  </button>
                                              </div>
                                      )}
                                  </td>
                                  <td className="px-4 py-2">
                                      {editableUserId === user._id ? (
                                          <div className="flex items-center">
                                              <input
                                                  type="text"
                                                  value={editableUserEmail}
                                                  onChange={(e) => setEditableUserEmail(e.target.value)}
                                                  className=" m-2 border rounded-lg"
                                                  
                                              />
                                              <button onChange={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-2 rounded-lg">
                                                <FaCheck />
                                              </button>
                                      </div>
                                      ) : (
                                              <div className="flex items-center">
                                                  <p>{user.email}</p>
                                                  <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                      <FaEdit className="ml-[1rem]" />
                                                  </button>
                                              </div>
                                      )}
                                  </td>
                                  
                                  <td className="px-4 py-2">
                                      {user.isAdmin ? (
                                        <FaCheck style={{color:'green'}} />
                                      ) : (
                                        <FaTimes style={{color:'red'}} />
                                      )}
                                  </td>
                                  <td className="px-4 py-2">
                                      {!user.isAdmin && (
                                          <div className="flex">
                                              <button onClick={() => deleteHandler(user._id)} className="bg-red-500 hover:underline hover:bg-red-700 text-white font-bold py-2 px-4">
                                                  <FaTrash/>
                                              </button>
                                        </div>
                                      )}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </div>      
            </div>
          )}
    </div>
  )
}

export default UserList