import asyncHandler from "../utils/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        console.log("Received request to create category:", req.body )
        const {name} = req.body
 
        if (!name) {
            return res.json({error: "Name is required."})
        }

        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            res.json({error: 'Already exists'})
        }

        const category = await new Category({ name })
                                        .save()
        res.json(category)

 
    } catch (error) {
        console.log(error)
        return res.status(404).json(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        const { categoryId } = req.params
        
        const category = await Category.findOne({ _id: categoryId })
        if (!category) {
            return res
                .status(404)
                .json({error: 'Category not found'})
        }
        category.name = name
        const updatedCategory = await category.save()
        res.json(updatedCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

const getAllCategory = asyncHandler(async (req, res) => {
     const getAll = await Category.find({})
     res.json(getAll)
})

const getCategoryById = asyncHandler(async (req, res) => {
    const categoryId = req.params.id; 
    try {
        const findCategory = await Category.findById(categoryId);
        res.json(
            findCategory
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" }); 
    }
});

const DeleteById = asyncHandler(async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId)
        res.json(removed)
    } catch (error) {
        console.log(error)
    }
}) 

const listCategory = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({})
        res.json(all)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

export {
    createCategory,
    updateCategory,
    getAllCategory,
    getCategoryById, 
    DeleteById,
    listCategory
}