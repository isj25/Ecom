import express from "express";
import {createOrder, getOrderById, getOrders, updateOrderById} from "../controllers/orderController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()


router.route("/").post(protect,createOrder);
router.route("/getorders").get(protect,getOrders);
router.route("/:id").get(protect,getOrderById)
router.route("/:id/pay").put(protect,updateOrderById);


export default router