import { ORDER_CREATE_FAIL,ORDER_CREATE_SUCCESS,ORDER_CREATE_REQUEST, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "../constants/orderConstants.js";
import axios from 'axios';
import asyncHandler from 'express-async-handler';
import { useSelector } from "react-redux";


export const createOrder = (orderDetails) => asyncHandler(async(dispatch,getState)=>{



   
    try{


        dispatch({
            type: ORDER_CREATE_REQUEST
        });
    
        const user = getState().userLogin.userInfo;
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${user.token}`
            }
        }
    
        const {data} = await axios.post("/api/orders",orderDetails,config);
        //console.log(data)
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



export const getOrderDetails = (id) => asyncHandler(async(dispatch,getState)=>{


      

        try{


            dispatch({
                type: ORDER_DETAILS_REQUEST
            });

            const userInfo = getState().userLogin.userInfo
          //  console.log(userInfo)

            const config = {
                headers:{
                    'Content-Type':'application/json',
                     Authorization : `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.get(`/api/orders/${id}`,config);
       
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload : data
            })
    
        }catch(error)
        {
           
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
      

})