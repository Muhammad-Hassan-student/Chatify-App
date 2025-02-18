import express from 'express'

import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDb } from './lib/connect.db.js';
import cookieparser from 'cookie-parser'

//message
import messageRoute from './routes/message.route.js'

dotenv.config();


const app = express();

//if get data from body by req so do like this
app.use(express.json());
app.use(cookieparser());


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoute);
app.listen(5001,() => {
    console.log("server running successfully");
    connectDb();
}) 

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