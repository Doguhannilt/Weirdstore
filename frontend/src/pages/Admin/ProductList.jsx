import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
    
    const navigate = useNavigate();

    // useStates
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    

    // RTK
    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const productData = new FormData()
            
            // append
            productData.append('image', image)
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            productData.append('brand', brand)
            productData.append('countInStock', stock)

            const { data } = await createProduct(productData)
            
            if (data.error) {
                toast.error('Product create failed. Try Again.')
            } else {
                toast.success(`${data.name} is created.`)
                navigate('/')
            }

        } catch (error) {
            console.error(error)
            toast.error('Product create failed. Try again.')
        }
    }

    const uploadFileHandler = async (e) => {
        console.log("Debug 1 - isStarted")
        const formData = new FormData()
        console.log("Debug 2 - isFormDataUploaded")
        formData.append('image', e.target.files[0])
        console.log(e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
            setImageUrl(res.image)
        } catch (error) {
            console.error(error)
            toast.error(error?.data?.message || error.error)
        }
    };



    return (
        <div className="container mx-auto px-4 sm:px-6 xl:px-8">
            <div className="flex flex-col md:flex-row">

                <AdminMenu />
                {/* Left Section */}
                <div className="md:w-3/4 p-3">
                    <div className="mb-4 text-2xl font-bold">Create Product</div>
                    
                    {/* Display uploaded image */}
                    {imageUrl && (
                        <div className="text-center">
                            <img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]" />
                        </div>
                    )}
                    {/* Upload Image button */}
                    <div className="mb-4">
                        <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-3">
                            {image ? image.name : 'Upload Image'}
                            <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className="" />
                        </label>
                    </div>

                    {/* Product Details Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-black">Name</label>
                            <input type="text" className="p-4 border rounded-lg text-black w-full" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        
                        {/* Price */}
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-black">Price</label>
                            <input type="number" className="p-4 border rounded-lg text-black w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        {/* Quantity */}
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-black">Quantity</label>
                            <input type="number" className="p-4 border rounded-lg text-black w-full" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        
                        {/* Brand */}
                        <div className="mb-4">
                            <label htmlFor="brand" className="block text-black">Brand</label>
                            <input type="text" className="p-4 border rounded-lg text-black w-full" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </div>

                        {/* Description */}
                        <div className="col-span-2 mb-4">
                            <label htmlFor="description" className="block text-black">Description</label>
                            <textarea className="p-4 border rounded-lg text-black w-full" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        {/* Stock and Category */}
                        <div>
                            {/* Stock */}
                            <div className="mb-4">
                                <label htmlFor="stock" className="block text-black">Count In Stock</label>
                                <input type="number" className="p-4 border rounded-lg text-black w-full" value={stock} onChange={(e) => setStock(e.target.value)} />
                            </div>
                            
                            {/* Category */}
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-black">Category</label>
                                <select className="p-3 border rounded-lg  text-black w-full" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {categories && categories.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold text-white bg-pink-600"
                            onClick={handleSubmit}>
                            Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
