import express from "express";
import { authenticate, authorizeAdmin } from '../middlewares/authMidd.js'



// orderController.js
import { createOrder } from "../controller/orderController.js";

const router = express.Router()

router
    .route('/')
    .post(authenticate, createOrder)



export default router