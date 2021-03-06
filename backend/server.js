import express from 'express'
import connectDB from './config/db.js'
import morgan from 'morgan';
import dotenv from 'dotenv'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import {notFound , errorHandler} from "./middleware/errorMiddleware.js";
import path from 'path'






const app = express()
dotenv.config();
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'))
}

//connect to database
connectDB();


app.use(express.json())




app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes)
app.use("/api/upload",uploadRoutes);
app.use("/api/orders",orderRoutes)

const __dirname = path.resolve();



if(process.env.NODE_ENV === 'production')
{

        app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
        app.use(express.static(path.join(__dirname,'/frontend/build')))
        app.get('*',(req,res)=>{
            res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
        })
}else
{
    app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
    app.get("/",(req,res)=>{
        res.json("Server is running ...");
    })
    
}




app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000
app.listen(PORT,console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT} `.yellow.bold));