import { useState } from 'react'
import { toast } from "react-toastify"

import {
    useCreateCategoryMutation,
    useFetchCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
} from '../../redux/api/categoryApiSlice' 
import CategoryForm from '../../components/CategoryForm'
import Modal from '../../components/Modal'
import AdminMenu from './AdminMenu'

const CategoryList = () => {
    const {data: categories} = useFetchCategoriesQuery()
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleCreateCategory = async (e) => {
        e.preventDefault()

        if (!name) {
            toast.error('Category name is required')
            return
        }

        try {
            const result = await createCategory({ name }).unwrap()
            if (result.error) {
                console.log(error)
                toast.error(result.error)
            } else {
                setName("")
                toast.success(`${result.name} is created`)
            }
        } catch (error) {
            console.error(error)
            toast.error('Creating category failed.')
        }
    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault()
        if (!updatingName) {
            toast.error('Category name is required')
            return
        }
        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id, updatedCategory: {
                name: updatingName
                }
            }).unwrap()
            
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(`${result.name} is updated`)
                setSelectedCategory(null)
                setUpdatingName('')
                setModalVisible(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteCategory = async (e) => {
        try {
            const result = await deleteCategory({ categoryId: selectedCategory._id }).unwrap()

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(`${result.name} is deleted`)
                setSelectedCategory(null)
                setModalVisible(false)
            }
        } catch (error) {
            console.error(error)
            toast.error(`Category deletion failed`)
        }
    }

  return (
      <>
          <div className="ml-[10rem] flex flex-col md:flex-row">
              {/* <AdminMenu/>*/}
              <AdminMenu />
              <div className="md:w-3/4 p-3">
                  <div className="h-12">Manage Categories</div>
                  <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
                  <br></br>
                  <hr />
                  <div className="flex flex-wrap">
                      {categories?.map((category) => (
                          <div key={category._id}>
                              <button
                                  onClick={() => {
                                      setModalVisible(true)
                                      setSelectedCategory(category)
                                      setUpdatingName(category.name)
                                  }}
                                  className="bg-white-border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white">
                                  {category.name}
                              </button>
                          </div>
                      ))}
                  </div>

                  <Modal
                      isOpen={modalVisible}
                      onClose={() => setModalVisible(false)}
                  >
                      <CategoryForm
                          value={updatingName}
                          setValue={value => setUpdatingName(value)}
                          handleSubmit={handleUpdateCategory}
                          buttonText='Update'
                          handleDelete={handleDeleteCategory}
                      />
                  </Modal>
              </div>
          </div>
      </>
  )
}

export default CategoryList