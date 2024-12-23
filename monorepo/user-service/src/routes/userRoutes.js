import express from 'express'
import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getSpecificProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById,
}
from '../controller/userController.js'

import {
    authenticate,
    authorizeAdmin
}
from '../utils/authMidd.js'



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

router
    .route("/profile")
    .get(authenticate, getSpecificProfile)
    .put(authenticate, updateCurrentUserProfile)


// Admin Routes
router
    .route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById)


export default router