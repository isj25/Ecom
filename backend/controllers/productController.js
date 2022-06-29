import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";



//@desc Fetch all products
//@route GET /api/products  
//@access   public
const getProducts = asyncHandler(async(req,res)=>{

    const products = await Product.find({});
    // res.status(404);

    // throw new Error('Not found')
    res.json(products);

});

//@desc Fetch  productd based on ID
//@route GET /api/products/:id 
//@access   public

const getProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
        

        if(product)
        {
            res.json(product);
        }else
        {
            res.status(404);
            throw new Error("Product not found")
        }
});





export {getProduct,getProducts};