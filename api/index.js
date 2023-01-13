import express from "express"
import dotenv from "dotenv"
import mongoose from 'mongoose'
import cookieParser from "cookie-parser"
import authRoute from './routes/auth.js'
import hotelRoute from './routes/hotels.js'
import userRoute from './routes/users.js'
import roomRoute from './routes/rooms.js'
import cors from 'cors'

dotenv.config()
const app = express()

const connect = async()=>{
    try 
    {
     await mongoose.connect(process.env.MONGO)
     console.log("databse connected")
    } 
    catch (error)
     {
      throw error  
    }
}

// mongoose.connection.on('disconnected',()=>{
//     console.log("databse disconnected")
// })

// mongoose.connection.on('connected',()=>{
//     console.log("databse connected")
// })
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelRoute)
app.use("/api/users", userRoute)
app.use("/api/rooms", roomRoute)

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})
app.listen(8000, ()=>{
    connect()
    console.log('server running')
})