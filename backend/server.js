import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import {notFound , errorHandler} from "./middleware/errorMiddleware.js";

const app = express()
dotenv.config();


//connect to database
connectDB();


app.use(express.json())

app.get("/",(req,res)=>{
    res.json("Server is running ...");
})


app.get("/api/config/paypal",(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))
app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes)

app.use("/api/orders",orderRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000
app.listen(PORT,console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT} `.yellow.bold));