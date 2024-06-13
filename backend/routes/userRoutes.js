import express from 'express'
import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers
}
from '../controller/userController.js'

import {
    authenticate,
    authorizeAdmin
}
from '../middlewares/authMidd.js'



const router = express.Router()


router
    .route('/')
    .post(createUser)
    .get(authenticate, authorizeAdmin, getAllUsers)

router
    .route("/auth")
    .post(loginUser)

router
    .route("/logout")
    .post(logoutUser)

export default router