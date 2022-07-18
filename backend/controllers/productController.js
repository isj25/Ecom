import expressAsyncHandler from "express-async-handler";
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





//@desc Delete  productd based on ID
//@route DELETE /api/products/:id 
//@access   private/admin

const deleteProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product)
    {
        await Product.deleteOne({_id:req.params.id});
        res.json({success:true})
    }else
    {
        res.status(404);
        throw new Error("Product not found")
    }
});




//@desc Create  product
//@route POST /api/products/
//@access   private/admin



const createProduct = asyncHandler(async(req,res)=>{

        const product = new Product({
            name : "Sample name",
            image : "/images/sample.jpg",
            price:0,
            brand:"Sample Brand",
            category:"Sample Category",
            description: "Sample Description",
            user:req.user._id
        })


        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
})



//@desc Update  product
//@route PUT /api/products/:id
//@access   private/admin

const updateProduct = expressAsyncHandler(async(req,res)=>{

    const product = await Product.findById(req.params.id);
    if(product)
    {

            const {name,brand,category,image,price,description,countInStock} = req.body;
            product.name = name;
            product.image = image;
            product.brand = brand;
            product.category = category;
            product.price = price;
            product.description = description;
            product.countInStock = countInStock;
            product.user = req.user._id;


            const updatedProduct = await product.save();
            res.json(updatedProduct);

    }else
    {
        res.status(404);
        throw new Error("Product Not Found");
    }

})


export {getProduct,getProducts,deleteProductById,createProduct,updateProduct};