import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS} from "../constants/productConstants.js";
import {PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL} from "../constants/productConstants.js";

import axios from "axios";



export const listProducts = () => async(dispatch) =>{    // this is possible from thunk package

        try{
            dispatch({type:PRODUCT_LIST_REQUEST});
           
           
              const  {data} =await axios.get("/api/products");
     
            dispatch({type:PRODUCT_LIST_SUCCESS,payload: data});

        }catch (error)
        {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
}



export const productDetails = (id)=>async(dispatch)=>{
    try{
            dispatch({type:PRODUCT_DETAILS_REQUEST});
        
            const {data} = await axios.get(`/api/products/${id}`);
            dispatch({type:PRODUCT_DETAILS_SUCCESS,payload : data});
    }catch(error)
    {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
        
    }
}



export const deleteProductById = (productId) =>async(dispatch,getState)=>{


    try{

        

        const user = getState().userLogin.userInfo;
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${user.token}`
            }
        }

            dispatch({
                type: PRODUCT_DELETE_REQUEST
            })
            const {data} = await axios.delete(`/api/products/${productId}`,config)

            dispatch({
                type: PRODUCT_DELETE_SUCCESS,
                payload : data
            })

    }catch(error)
    {
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload : error.response && error.response.data.message? error.response.data.message : error.message
        })
    }
}




export const createNewProduct = ()=> async(dispatch,getState)=>{

    try{

        

        const user = getState().userLogin.userInfo;
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${user.token}`
            }
        }
            dispatch({
                type: PRODUCT_CREATE_REQUEST
            })
            const {data} = await axios.post("/api/products/",{},config)

            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload : data
            })

            

    }catch(error)
    {
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload : error.response && error.response.data.message? error.response.data.message : error.message
        })
    }


}



export const createdproductreset = ()=>(dispatch)=>{
    dispatch({
        type: PRODUCT_CREATE_RESET
    })
}


export const updateProduct = (product)=>async(dispatch,getState)=>{



    try{


        const userLogin  = getState().userLogin;
        const {userInfo} = userLogin;

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }


        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })



        const {data} = await axios.put(`/api/products/${product._id}`,product,config);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload : data
        })



    }catch(error)
    {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}