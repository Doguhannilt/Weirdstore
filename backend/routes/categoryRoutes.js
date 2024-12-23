import express from 'express'
const router = express.Router()
import {authenticate, authorizeAdmin} from '../middlewares/authMidd.js'
import {
    createCategory,
    DeleteById,
    listCategory,
    getAllCategory,
    getCategoryById,
    updateCategory
} from '../controller/categoryController.js'


router
    .route('/')
    // Create a category http://localhost:5000/api/category/
    .post(
        authenticate,
        authorizeAdmin,
        createCategory)
    // Get all categories http://localhost:5000/api/category/
    .get(
        authenticate,
        authorizeAdmin,
        getAllCategory
    )

router
    .route('/:categoryId')
    // Update a category http://localhost:5000/api/category/:categoryId
    .put(
        authenticate,
        authorizeAdmin,
        updateCategory)
    .delete(
        authenticate,
        authorizeAdmin,
        DeleteById
    )

router
    // Get All categories but different url http://localhost:5000/api/category/categories
    .route("/categories")
    .get(listCategory)

router
    // Get Specific category but different url http://localhost:5000/api/category/:id
    .route("/:id")
    .get(
        authenticate,
        authorizeAdmin,
        getCategoryById
    )

export default router 