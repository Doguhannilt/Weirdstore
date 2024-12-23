// Packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectiontoDB from './src/config/database.js'


const app = express()



connectiontoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())









app.listen(
    process.env.PORT,
    () => console.log(`Server running on PORT - API GATEWAY: ${process.env.PORT}`)) 