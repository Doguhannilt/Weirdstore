import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'
import implementToken from '../utils/implementToken.js'


const createUser = asyncHandler(async (req, res) => {
    const {
        username,
        email,
        password } = req.body
    
        // body input checking
    if
    (
        !username || !email || !password
    )

    {
        throw new Error('Please fill all the inputs')
    }


    // Check if user exists
    const userExists = await User
        .findOne({ email })
    if (userExists) res.status(400)
                        .send("User already exists")
    

    // Hash the pass
    const salt = await bcrypt
        .genSalt(10)
    const hashedPass = await bcrypt
        .hash(password,salt)
    
    
    // Create a new acc
    const newUser = new User({
        username, 
        email, 
        password:hashedPass
    }) 
    
    // jwt
    implementToken(res, newUser._id)

    try {
        await newUser
            .save()
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username, 
            password: newUser.password
        })

    } catch (err) {
        res.status(400)
        throw new Error("Invalid User Data")
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body

    const existingUser = await User.findOne({ email })
    
    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (isPasswordValid) {
            implementToken(res, existingUser._id)
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username, 
                password: existingUser.password,
                isAdmin: existingUser.isAdmin
            })
            return 
        }
    }


})

const logoutUser = asyncHandler(async (req, res) => {
    res
        .cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })

    res
        .status(200)
        .json({ message: "Removed" })
})

const getAllUsers = asyncHandler(async (req,res) => {
    const user = await User.find({})
    res.json(user)
})

const getSpecificProfile = asyncHandler(async (req, res) => {
    const user = await User
                    .findById(req.user._id)
    if (user) {
        res
            .json({
                _id: user._id,
                username: user.username,
                email: user.email
            })
    } else {
        res
            .status(404)
        throw new Error("User is not found")
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User
                .findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt
            .genSalt(10)
        const hashedPass = await bcrypt
            .hash(req.body.password,salt)
        
            user.password = hashedPass
        }
    

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res
            .status(404)
        throw new Error("User not found")
    }
})

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User
                .findById(req.params.id)

    if (user) {
        if (user.isAdmin) {
            res
                .status(400)
            throw new Error ("Cannot delete an admin user")
        }

        await User.deleteOne({_id: user._id})
        res
            .json({message: "User removed"})

    } else {
        res
            .status(404)
        throw new Error("User is not deleted")
    }
})

export {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getSpecificProfile,
    updateCurrentUserProfile,
    deleteUserById
}