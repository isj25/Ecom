import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import productRoutes from "./routes/productRoutes.js";
import {notFound , errorHandler} from "./middleware/errorMiddleware.js";

const app = express()
dotenv.config();


//connect to database
connectDB();




app.get("/",(req,res)=>{
    res.json("Server is running ...");
})

app.use("/api/products",productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000
app.listen(PORT,console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT} `.yellow.bold));