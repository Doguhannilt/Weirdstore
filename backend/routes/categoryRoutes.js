import express from 'express'
const router = express.Router()
import {authenticate, authorizeAdmin} from '../middlewares/authMidd.js'
import { createCategory } from '../controller/categoryController.js'


router
    .route('/')
    .post(
        authenticate,
        authorizeAdmin,
        createCategory)


export default router 