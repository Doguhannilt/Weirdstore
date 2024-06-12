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

    const userExists = await User
        .findOne({ email })
    if (userExists) res.status(400)
                        .send("User already exists")
    
    const salt = await bcrypt
        .genSalt(10)
    const hashedPass = await bcrypt
        .hash(password,salt)
    
    const newUser = new User({
        username, 
        email, 
        password:hashedPass
    }) 
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

export {createUser}