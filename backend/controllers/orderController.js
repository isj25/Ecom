import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import ObjectId from "mongodb"


// @desc create New Orders
// @route POST /api/orders
// @access PRIVATE


export const createOrder = asyncHandler(async(req,res)=>{


    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

   
    

    if(orderItems && orderItems.length===0)
    {
        res.status(400);
        throw new Error("No order Items");
    }else
    {
         const order = new Order({
           user: req.user._id,orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice
         })

         const createdOrder = await order.save();
       
         res.status(201).json(createdOrder);
    }

})



//@desc GET ORDER BY ID
//@route /api/orders/id
//@access PRIVATE
export const getOrderById = asyncHandler(async(req,res)=>{
    
    const order = await Order.findById(req.params.id).populate('user','name email');

    if(order)
    {
      res.json(order)
    }else
    {
      res.status(404);
      throw new Error("Order not found");
    }

})



//desc Update order to paid
//route /api/orders/:id/pay
//@access Private



export const updateOrderById = asyncHandler(async(req,res)=>{
    
  const order = await Order.findById(req.params.id) 

  if(order)
  {
    order.isPaid = true;
    order.paitAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status : req.body.status,
      update_time : req.body.update_time,
      email_address : req.body.payer.email_address
    }


    const updatedOrder = await order.save();
    res.json(updatedOrder);

  }else
  {
    res.status(404);
    throw new Error("Order not found");
  }

})



export const getOrders  = asyncHandler(async(req,res)=>{

    try{

        const userId = req.user._id
        const orders = await Order.find({user:userId});

        res.json(orders)
    }catch(error)
    {
      throw new Error(error);
    }
    

})
