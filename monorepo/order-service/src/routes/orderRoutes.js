import express from "express";
import { authenticate, authorizeAdmin } from '../utils/authMidd.js'



// orderController.js
import {
    createOrder,
    getAllOrders,
    getUsersOrders,
    countTotalOrders,
    calculateTotalSales,
    calculateTotalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDeliver
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

router
    .route('/total-sales')
    .get(calculateTotalSales)
router
    .route('/total-sales-by-date')
    .get(calculateTotalSalesByDate)
router
    .route('/:id')
    .get(authenticate, findOrderById)
router
    .route('/:id/pay')
    .put(authenticate, markOrderAsPaid)
router
    .route('/:id/deliver')
    .put(authenticate, authorizeAdmin, markOrderAsDeliver)


export default router