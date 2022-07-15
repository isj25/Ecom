import express from "express"
import {protect,admin} from "../middleware/authMiddleware.js";

import {getUserProfile,loginUser,registerUser,updateUserProfile,getAllUsers,deleteUserById } from "../controllers/userController.js"




const router = express.Router();

// api/users
router.post("/login",loginUser);
router.post("/",registerUser);
router.route("/").get(protect,admin,getAllUsers)
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
router.route("/delete/:id").get(protect,admin,deleteUserById)



export default router; 