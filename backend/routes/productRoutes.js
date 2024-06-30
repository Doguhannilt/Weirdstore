import express from "express";
import formidable from 'express-formidable'
import {
    authenticate,
    authorizeAdmin,
}
from '../middlewares/authMidd.js'
import checkId from "../middlewares/checkId.js";

// Controller
import {
    addProduct,
    updateProductDetails,
    removeProducts,
    fetchProducts,
    fetchProductById
} from "../controller/productController.js";

const router = express.Router()

router
    .route("/")
    .post(
        authenticate,
        authorizeAdmin,
        formidable(),
        addProduct)
    .get(
        fetchProducts
    )
router
    .route("/:id")
    .put(
        authenticate,
        authorizeAdmin,
        formidable(),
        updateProductDetails)
    .delete(
        authenticate,
        authorizeAdmin,
        removeProducts)
    .get(
        fetchProductById
    )













export default router