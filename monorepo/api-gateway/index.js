// Packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectiontoDB from './src/config/database.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
const app = express()



connectiontoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:5001'}))





// 5001 PORTUNA COOKIE GÖNDER

// GET: verifyToken
app.get('/verifyToken', (req, res) => {
    console.log('Cookies:', req.cookies); // COOKIE GELIYOR BURADA ANCAK DEVAMI YO
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Token is valid', data: decoded });
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});



app.listen(
    process.env.PORT,
    () => console.log(`Server running on PORT - API GATEWAY: ${process.env.PORT}`)) 




// const verifyJWT = (req, res, next) => {
//     const token = req.cookies.jwt; // HttpOnly cookie'den token al
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; // Kullanıcı bilgisini sonraki işlemler için sakla
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Invalid or expired token' });
//     }
//   };
  
//   // API Gateway yönlendirme
//   app.get('/api/product', verifyJWT, async (req, res) => {
//     try {
//       // Product Service'e istek gönder
//       const productResponse = await axios.get('http://localhost:5002/product', {
//         headers: {
//           'x-user-id': req.user.id, // Kullanıcı bilgisi mikroservise iletilir
//         },
//       });
  
//       res.status(200).json(productResponse.data); // Yanıt istemciye iletilir
//     } catch (error) {
//       res.status(500).json({ message: 'Error retrieving product data', error: error.message });
//     }
//   }); 