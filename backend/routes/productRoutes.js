import express from "express";
import formidable from 'express-formidable'
import {
    authenticate,
    authorizeAdmin
}
from '../middlewares/authMidd.js'
import checkId from "../middlewares/checkId.js";

// Controller
import { addProduct, updateProductDetails } from "../controller/productController.js";

const router = express.Router()

router
    .route("/")
    .post(authenticate, authorizeAdmin, formidable(), addProduct)

router
    .route("/:id")
    .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)














export default router