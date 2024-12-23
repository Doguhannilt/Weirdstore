// Packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectiontoDB from './src/config/database.js'

import categoryRoutes from './src/routes/categoryRoutes.js'

const app = express()

dotenv.config()

connectiontoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use("/",categoryRoutes)





app.listen(
    process.env.PORT,
    () => console.log(`Server running on PORT - API GATEWAY: ${process.env.PORT}`)) 