// Packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectiontoDB from './src/config/database.js'
import cors from 'cors'

import userRoutes from './src/routes/userRoutes.js'

const app = express()


dotenv.config()

connectiontoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:5000'}))



const URL = process.env.API_USERS // http://localhost:5001/api/users
console.log(URL)

app.use("/",userRoutes)


// BURADA 5001 PORTU VAR VE TOKEN BURAYA GELMIYOR


app.listen(
    process.env.PORT,
    () => console.log(`Server running on PORT - USER SERVICE: ${process.env.PORT}`)) 