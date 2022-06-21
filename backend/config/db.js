import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
dotenv.config();
const connectDB = async ()=>{
    
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected : ${conn.connection.host}`.yellow.underline);
    }catch(error)
    {
        console.error(`Error : ${error.message}`.red.bold);
        process.exit(1);
    }
}

export default connectDB;