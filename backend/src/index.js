import express from 'express'

import authRoutes from './routes/auth.route.js'

import dotenv from 'dotenv'

import { connectDb } from './lib/connect.db.js';

dotenv.config();


const app = express();

//if get data from body by req so do like this
app.use(express.json());

app.use("/api/auth",authRoutes);
app.listen(5001,() => {
    console.log("server running successfully");
    connectDb();
}) 