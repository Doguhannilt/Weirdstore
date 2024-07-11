import express from "express";
import formidable from 'express-formidable'
import checkId from "../middlewares/checkId.js";

import {
    authenticate,
    authorizeAdmin,
}
from '../middlewares/authMidd.js'
// Controller
import {
    addProduct,
    updateProductDetails,
    removeProducts,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
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
    .route("/allproduct")
    .get(
        fetchAllProducts)
    
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
        fetchProductById)
        
router
    .route("/top")
    .get(fetchTopProducts)

router
    .route('/:id/reviews')
    .post(authenticate, authorizeAdmin,checkId, addProductReview)

router
    .route('/new')
    .get(fetchNewProducts)

router
    .route('/filtered-products')
    .post(filterProducts)

export default router 