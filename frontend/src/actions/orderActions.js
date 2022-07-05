import { ORDER_CREATE_FAIL,ORDER_CREATE_SUCCESS,ORDER_CREATE_REQUEST, ORDER_HISTORY_CLEAR } from "../constants/orderConstants.js";
import axios from 'axios';
import asyncHandler from 'express-async-handler';


export const createOrder = (orderDetails) => asyncHandler(async(dispatch,getState)=>{



    dispatch({
        type: ORDER_CREATE_REQUEST
    });

    try{
        const user = getState().userLogin.userInfo;
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${user.token}`
            }
        }
    
        const {data} = await axios.post("/api/orders",orderDetails,config);
        console.log(data)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload : data
        })
       
    }catch(error)
    {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
   



});