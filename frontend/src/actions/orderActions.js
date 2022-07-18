import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_DETAILS_REQUEST,
  ALL_ORDER_DETAILS_SUCCESS,
  ALL_ORDER_DETAILS_FAIL,
  CLEAR_ORDER,
  ORDER_MY_DETAILS_REQUEST,
  ORDER_MY_DETAILS_SUCCESS,
  ORDER_MY_DETAILS_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
} from "../constants/orderConstants.js";
import axios from "axios";
import asyncHandler from "express-async-handler";






// _____________________________CREATE ORDER___________________________________

export const createOrder = (orderDetails) =>
  asyncHandler(async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });

      const user = getState().userLogin.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/orders", orderDetails, config);
      //console.log(data)
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });

      // dispatch({
      //   type: CLEAR_ORDER
      // })


      // localStorage.removeItem('cartItems')
      // dispatch({
      //     type : CART_CLEAR
      // })

    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  });




// _____________________________GET ORDER DETAILS___________________________________






export const getOrderDetails = (id) =>
  asyncHandler(async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });

      const userInfo = getState().userLogin.userInfo;
      //  console.log(userInfo)

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);

      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  });







  // _____________________________update ORDER___________________________________


  export const updateOrder = (orderId,orderUpdate) =>asyncHandler(async(dispatch,getState)=>{


      try{

          dispatch({
            type: ORDER_UPDATE_REQUEST
          })
        const userInfo = getState().userLogin.userInfo
        //console.log(userInfo)

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        let update = {}
        if(orderUpdate.isDelivered)
        {
          update.isDelivered = true
        }

        if(orderUpdate.isPaid)
        {
          update.isPaid = true
        }


        //console.log(update)
        const {data}  = await axios.put(`/api/orders/${orderId}`,update,config)

        dispatch({
          type: ORDER_UPDATE_SUCCESS,
          payload : data

        })

      }catch(error)
      {


        dispatch({
          type: ORDER_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });

      }

  })



  export const getMyOrders = ()=> asyncHandler(async(dispatch,getState)=>{



    try{

        dispatch({

          type : ORDER_MY_DETAILS_REQUEST
        })


        const userInfo = getState().userLogin.userInfo
        //console.log(userInfo)

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };


        const {data} = await axios.get("/api/orders/getorders",config);
       // console.log(data)
        dispatch({
          type: ORDER_MY_DETAILS_SUCCESS,
          payload : data
        })


    }catch(error)
    {

      dispatch({
        type: ORDER_MY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });


  }})




export const getAllOrders = () =>asyncHandler(async(dispatch,getState)=>{

      try{

        dispatch({

          type : ALL_ORDER_DETAILS_REQUEST
        })


        const userInfo = getState().userLogin.userInfo
        //console.log(userInfo)

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };


        const {data} = await axios.get("/api/orders",config);

        dispatch({
          type: ALL_ORDER_DETAILS_SUCCESS,
          payload : data
        })


      }catch(error)
      {

        dispatch({
          type: ALL_ORDER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });

      }

}) 


  export const clearOrder = ()=> (dispatch)=>{



    dispatch({
      type: CLEAR_ORDER
    })
  }





