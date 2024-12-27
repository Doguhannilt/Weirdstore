import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    console.log("JWT Token:", token); // Debugging için token kontrolü

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging için token içeriği

        req.user = await User.findById(decoded.userId).select("-password");
        if (!req.user) {
            res.status(404);
            throw new Error("User not found");
        }

        next(); // Bu olmadan bir sonraki middleware'e geçmez!
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        console.log("ADMIN VERIFIED")
        next()
    } else {
        res
            .status(401)
            .send("Not authorized as an admin")
    }
}

export {authenticate, authorizeAdmin}