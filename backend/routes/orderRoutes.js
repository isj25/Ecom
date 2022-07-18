import express from "express";
import {createOrder, getAllOrders, getOrderById, getOrders, updateOrderById} from "../controllers/orderController.js"
import {admin, protect} from "../middleware/authMiddleware.js"

const router = express.Router()


router.route("/").post(protect,createOrder).get(protect,admin,getAllOrders)
router.route("/getorders").get(protect,getOrders);
router.route("/:id").get(protect,getOrderById).put(protect,admin,updateOrderById);



export default router