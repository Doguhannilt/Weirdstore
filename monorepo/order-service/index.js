// Packages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectiontoDB from './src/config/database.js'
import orderRoutes from './src/routes/orderRoutes.js'

const app = express()
dotenv.config()
connectiontoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/order", orderRoutes)

app.listen(
    process.env.PORT,
    () => console.log(`Server running on PORT - ORDEE SERVICE: ${process.env.PORT}`)) 