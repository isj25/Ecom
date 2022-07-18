import express from 'express';

import { getProduct,getProducts,deleteProductById, createProduct, updateProduct } from '../controllers/productController.js';
import { protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route("/").get(getProducts).post(protect,admin,createProduct);



router.route("/:id").get(getProduct).delete(protect,admin,deleteProductById).put(protect,admin,updateProduct);



export default router;