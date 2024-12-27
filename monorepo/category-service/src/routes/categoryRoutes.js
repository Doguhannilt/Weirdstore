import express from 'express'
const router = express.Router()
import {authenticate, authorizeAdmin} from '../utils/authMidd.js'
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
    .post(
        authorizeAdmin,
        createCategory)
    .get(
        authorizeAdmin,
        getAllCategory
    )

router
    .route('/:categoryId')
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
    .route("/categories")
    .get(listCategory)

router
    .route("/:id")
    .get(
        authenticate,
        authorizeAdmin,
        getCategoryById
    )

export default router 