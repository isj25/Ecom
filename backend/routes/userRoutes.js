import express from "express"
import {protect} from "../middleware/authMiddleware.js";

import {getUserProfile,loginUser,registerUser } from "../controllers/userController.js"



const router = express.Router();


router.post("/login",loginUser);
router.post("/",registerUser);
router.route("/profile").get(protect,getUserProfile);


export default router; 