import express from 'express'
const router = express.Router()
import {authenticate, authorizeAdmin} from '../middlewares/authMidd.js'
import { createCategory,DeleteById, getAllCategory, getCategoryById, updateCategory } from '../controller/categoryController.js'


router
    .route('/')
    .post(
        authenticate,
        authorizeAdmin,
        createCategory)
    .get(
        authenticate,
        authorizeAdmin,
        getAllCategory
    )

router
    .route('/:categoryId')
    .put(
        authenticate,
        authorizeAdmin,
        updateCategory)
    .get(
        authenticate,
        authorizeAdmin,
        getCategoryById
    )
    .delete(
        authenticate,
        authorizeAdmin,
        DeleteById
    )

export default router 