import express from "express"
import {protect} from "../middleware/authMiddleware.js";

import {getUserProfile,loginUser,registerUser,updateUserProfile } from "../controllers/userController.js"



const router = express.Router();

// api/users
router.post("/login",loginUser);
router.post("/",registerUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);



export default router; 