import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";


//@desc Auth user && get token
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body

    const user = await User.findOne({email:email});
    if(user  && await user.matchPassword(password)) 
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin : user.isAdmin,
            token:generateToken(user._id)
        });
    }else
    {
        res.status(401);
        throw new Error("Invalid email or password")
    }

});  

//@desc RegisterUser
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async(req,res)=>{

    const {name,email,password} = req.body

    if(name && email && password){


        const userExists = await User.findOne({email:email});
        if(userExists)
        {
         res.status(400);
         throw new Error("User already Exists!");
        }
     
     
        const user = await User.create({name,email,password})
        //console.log(user);
     
        if(user)
        {
             res.status(201);
             res.json({
                 _id:user._id,
                 name:user.name,
                 email:user.email,
                 isAdmin : user.isAdmin,
                 token:generateToken(user._id)
             })
     
        }else
        {
             res.status(400);
             throw new Error("Invalid User");
        }





    }else
    {
        res.status(400);
        throw new Error("Invalid User");
    }

   

});  






//@desc Get logged in User profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async(req,res)=>{


    const user = await User.findById(req.user._id);
    if(user)
    {
        res.json({ _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin : user.isAdmin})
    }else
    {
        res.status(404);
        throw new Error("User Not Found!");
    }

});  


export {loginUser,getUserProfile,registerUser} ;