import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async(req,res,next)=>{
    let token  = req.headers.authorization;
   if(token && token.startsWith("Bearer"))
   {
       try{

            token  = token.split(' ')[1]
           //console.log(token)
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
            const userId = decodedToken.userId
            //console.log(userId)
            req.user = await User.findById(userId).select('-password');
            
       }catch(error)
       {
                //console.error(error)
                res.status(401);
                throw new Error("Not Authorized,token failed");
       }
   }


    if(!token)
   {
    res.status(401);
    throw new Error('Not Authorized ! No token ')
   }
    next();

}) 



export {protect};