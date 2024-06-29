import express from "express";
import formidable from 'express-formidable'
import {
    authenticate,
    authorizeAdmin
}
from '../middlewares/authMidd.js'
import checkId from "../middlewares/checkId.js";

// Controller
import { addProduct } from "../controller/productController.js";

const router = express.Router()

router
    .route("/")
    .post(authenticate, authorizeAdmin, formidable() ,addProduct)














export default router