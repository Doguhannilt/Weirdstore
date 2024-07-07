
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation
} from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"



const ProductUpdate = () => {

    const params = useParams()
    const { data: productData } = useGetProductByIdQuery(params._id)
    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || '')
    const [description, setDescription] = useState(productData?.description || '')
    const [price, setPrice] = useState(productData?.price || '')
    const [category, setCategory] = useState(productData?.category || '')
    const [brand, setBrand] = useState(productData?.brand || '')
    const [stock, setStock] = useState(productData?.countInStock || '')
    const [quantity, setQuantity] = useState(productData?.quantity || '')



    const navigate = useNavigate()

    const { data: categories = [] } = useFetchCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.category)
            setQuantity(productData.quantity)
            setBrand(productData.brand)
            setImage(productData.image)
        }
    }, [productData])


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            
            // append
            formData.append('image', image)
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('quantity', quantity)
            formData.append('brand', brand)
            formData.append('countInStock', stock)

            const { data } = await updateProduct({productId: params._id, formData})
            
            if (data.error) {
                toast.error('Product update failed. Try Again.')
                toast.error(data.error)
            } 

            toast.success(`${data.name} is updated.`)
            navigate('/admin/allproducts')
            
        } catch (error) {
            console.error(error)
            toast.error(error)
        }
    }

    const uploadFileHandler = async () => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success("Image updated")
            setImage(res.image)
        } catch (error) {
            toast.error("Failed")
        }
    }


    const handleDelete = async () => {
        try {
            let answer = window.confirm('Are you sure about that?')

            if (!answer) {
                return
            }

            const { data } = await deleteProduct(params._id)
            toast.success("Product is deleted")

        } catch (error) {
            console.log(error)
            toast.error("Delete failed")
        }
    }


    return (
        <div className="container mx-auto px-4 sm:px-6 xl:px-8">
            <div className="flex flex-col md:flex-row">

                <AdminMenu />
                {/* Left Section */}
                <div className="md:w-3/4 p-3">
                    <div className="mb-4 text-xl font-bold">Create Product</div>
                    
                    {/* Display uploaded image */}
                    {image && (
                        <div className="text-center">
                            <img src={image} alt="product" className="block mx-auto max-h-[200px]" />
                        </div>
                    )}
                    {/* Upload Image button */}
                    <div className="mb-4">
                        <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-3">
                            {image ? image.name : 'Upload Image'}
                            <input type="file" name="image" accept="image/*"
                                onChange={uploadFileHandler}
                                className=""
                            />
                        </label>
                    </div>

                    {/* Product Details Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-white">Name</label>
                            <input type="text" className="p-4 border rounded-lg bg-[#101011] text-white w-full" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        
                        {/* Price */}
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-white">Price</label>
                            <input type="number" className="p-4 border rounded-lg bg-[#101011] text-white w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        {/* Quantity */}
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-white">Quantity</label>
                            <input type="number" className="p-4 border rounded-lg bg-[#101011] text-white w-full" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        
                        {/* Brand */}
                        <div className="mb-4">
                            <label htmlFor="brand" className="block text-white">Brand</label>
                            <input type="text" className="p-4 border rounded-lg bg-[#101011] text-white w-full" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </div>

                        {/* Description */}
                        <div className="col-span-2 mb-4">
                            <label htmlFor="description" className="block text-white">Description</label>
                            <textarea className="p-4 border rounded-lg bg-[#101011] text-white w-full" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        {/* Stock and Category */}
                        <div>
                            {/* Stock */}
                            <div className="mb-4">
                                <label htmlFor="stock" className="block text-white">Count In Stock</label>
                                <input type="number" className="p-4 border rounded-lg bg-[#101011] text-white w-full" value={stock} onChange={(e) => setStock(e.target.value)} />
                            </div>
                            
                            {/* Category */}
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-white">Category</label>
                                <select className="p-3 border rounded-lg bg-[#101011] text-white w-full" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {categories && categories.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>

                                    <button
                            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600"
                     onClick={handleSubmit}
                    >
                            Update
                    </button>
                    <button
                            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
                      onClick={handleDelete}
                    >
                            Delete
                    </button>        
                    </div>

                </div>
            </div>
        </div>
    );
};


export default ProductUpdate