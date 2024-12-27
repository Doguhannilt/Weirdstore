// Packages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectiontoDB from './src/config/database.js'
import cors from 'cors'
import categoryRoutes from './src/routes/categoryRoutes.js'

const app = express()

dotenv.config()
connectiontoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:5000' }))
app.use('api/category', categoryRoutes)

app.listen(
    process.env.PORT,
    () => console.log(`Server running on PORT - CATEGORY SERVICE: ${process.env.PORT}`)) 