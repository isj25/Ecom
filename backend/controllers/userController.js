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



//@desc Get all users
//@route GET /api/users
//@access Private/Admin

const getAllUsers= asyncHandler(async(req,res)=>{


  

    const user = await User.find({});
   
    if(user)
    {
        res.json(user)
    }else
    {
        res.status(404);
        throw new Error("Users Not Found!");
    }

   
});  






//@desc Update user Profile
//@route PUT /api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async(req,res)=>{


    const user = await User.findById(req.user._id);
    if(user)
    {


        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password)
        {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();





        res.json({ _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin : updatedUser.isAdmin,
            token : generateToken(updatedUser._id)
        })
    }else
    {
        res.status(404);
        throw new Error("User Not Found!");
    }


});  



//@desc Delete User by Id
//@route DELETE /api/users/delete/id
//@access Private /admin

const deleteUserById = asyncHandler(async(req,res)=>{
   
    const id = req.params.id
    // console.log(id)
    // console.log(req.user._id)
    if(req.user._id.toString()=== id)
    {
        res.status(400)
        throw new Error("User Cannot be Deleted")
    }else
    {
        await User.deleteOne({"_id":id});
    
        const users = await User.find({});
        if(users)
        {
            res.json(users);
        }else{
            res.status(404)
            throw new Error("User Not found")
        }
    }

})

//desc GET user by Id
//route /api/users/:id
//access Private/admin
const getUserById = asyncHandler(async(req,res)=>{


    const user = await User.findById(req.params.id).select('-password');
    if(user)
    {
        res.json(user);
    }else
    {
        res.status(404);
        throw new Error("User Not Found");
    }


})




//@desc Update user 
//@route PUT /api/users/:id
//@access Private/admin

const updateUser= asyncHandler(async(req,res)=>{


    const user = await User.findById(req.params.id);
    if(user)
    {


        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;


        user.isAdmin = req.body.isAdmin || false;

        const updatedUser = await user.save();





        res.json({
             _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin : updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
           
        })
    }else
    {
        res.status(404);
        throw new Error("User Not Found!");
    }


});  


export {loginUser,getUserProfile,registerUser,updateUserProfile,getAllUsers,deleteUserById,getUserById,updateUser} ;