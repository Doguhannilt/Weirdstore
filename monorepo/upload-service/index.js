// Packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import uploadRoutes from './src/routes/uploadRoutes.js'

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname + '/uploads')))

app.listen(
    process.env.PORT,
    () => console.log(`Server running on PORT - UPLOAD SERVICE: ${process.env.PORT}`)) 