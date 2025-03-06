import express from 'express'

import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDb } from './lib/connect.db.js';
import cookieparser from 'cookie-parser'
import cors from 'cors'

//message
import messageRoute from './routes/message.route.js'
import {app,server,io} from './lib/socket.io.js'

dotenv.config();



//if get data from body by req so do like this
app.use(express.json());
app.use(cookieparser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoute);
server.listen(5001,() => {
    console.log("server running successfully");
    connectDb();
}) 
app.get('/test',(req,res) => res.send("Server is running"));

//error handler
app.use((err,req,res,next) => {
    const statusCode = err.status || 500;
    const  message = err.message  || "Internal server error???";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
 })