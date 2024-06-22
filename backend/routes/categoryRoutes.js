import express from 'express'
const router = express.Router()
import {authenticate, authorizeAdmin} from '../middlewares/authMidd.js'
import { createCategory, updateCategory } from '../controller/categoryController.js'


router
    .route('/')
    .post(
        authenticate,
        authorizeAdmin,
        createCategory)

router
    .route('/:categoryId')
    .put(
        authenticate,
        authorizeAdmin,
        updateCategory)


export default router 