// Packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// Utils
import connectiontoDB from './config/database.js'

dotenv.config()
const port = process.env.PORT || 5000

connectiontoDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello World")
})


app.listen(port, () => console.log(`Server running on port: ${port}`))