import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { UserModel } from './model/user.model.js';
import { router as authRoutes } from './routes/auth.routes.js';
import { router as productRoutes } from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(3000, ()=>{
    console.log("Server is running on the port 3000 ")
})