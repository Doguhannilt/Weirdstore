// Packages
import express from 'express'
import cookieParser from 'cookie-parser'
import connectiontoDB from './src/config/database.js'
import productRoutes from './src/routes/productRoutes.js'
import dotenv from 'dotenv'

const app = express()

connectiontoDB()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/product", productRoutes)

app.listen(
    process.env.PORT,
    () => console.log(`Server running on PORT - PRODUCT SERVICE: ${process.env.PORT}`)) 