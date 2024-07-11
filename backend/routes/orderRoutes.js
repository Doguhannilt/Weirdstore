import express from "express";
import { authenticate, authorizeAdmin } from '../middlewares/authMidd.js'



// orderController.js
import {
    createOrder,
    getAllOrders,
    getUsersOrders,
    countTotalOrders
} from "../controller/orderController.js";

const router = express.Router()

router
    .route('/')
    .post(authenticate, createOrder)
    .get(authenticate, authorizeAdmin, getAllOrders)

router
    .route('/mine')
    .get(authenticate, getUsersOrders)

router
    .route('/total-orders')
    .get(countTotalOrders)

export default router