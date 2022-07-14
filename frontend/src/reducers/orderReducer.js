import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, ALL_ORDER_DETAILS_REQUEST, ALL_ORDER_DETAILS_SUCCESS, ALL_ORDER_DETAILS_FAIL, CLEAR_ORDER, ORDER_MY_DETAILS_REQUEST, ORDER_MY_DETAILS_SUCCESS, ORDER_MY_DETAILS_FAIL } from "../constants/orderConstants.js";

export const orderCreateReducer = (state={},action) =>{


    switch(action.type)
    {
        case ORDER_CREATE_REQUEST:
            {
                return {

                    loading : true,

                }

            }
        case ORDER_CREATE_SUCCESS:
            {
                return {
                    loading: false,
                    success : "Order placed Successfully",
                    order : action.payload
                }

            }

        case ORDER_CREATE_FAIL:
            {
                return {
                  
                    loading : false,
                    error : action.payload
                }
            }
        case CLEAR_ORDER:
            {
                return {
                    loading : false,

                }
            }
        default :
        {
            return state;
        }
    }

}


export const orderDetailsReducer = (state ={loading:true,orderItems:[],shippingAddress:{}},action) =>
{
    switch(action.type)
    {
        case ORDER_DETAILS_REQUEST:
            {
                return {

                    ...state,
                    loading : true,

                }

            }
        case ORDER_DETAILS_SUCCESS:
            {
                return {
                    loading: false,
                    order : action.payload
                }

            }

        case ORDER_DETAILS_FAIL:
            {
                return {
                  
                    loading : false,
                    error : action.payload
                }
            }

       

        default :
        {
            return state;
        }
    }
}



export const orderPayReducer = (state ={},action)=>{


        switch(action.type)
        {
            case ORDER_PAY_REQUEST:
                {
                    return {loading :true}
                }

            case ORDER_PAY_SUCCESS:
                {
                    return {
                        loading : false,
                        success : true, 
                        
                    }
                }

            case ORDER_PAY_FAIL :{
                return {
                    loading : false,
                    error : action.payload
                }
            }

            case ORDER_PAY_RESET:{
                    return {};
            }

            default:
                {
                    return state;
                }
        }

}




export const allOrdersReducer =(state = {orders:[]},action)=>{



    switch(action.type)
    {


        case ALL_ORDER_DETAILS_REQUEST:
            {

              return {  ...state,
                loading : true
                }
            }   

        case ALL_ORDER_DETAILS_SUCCESS:
            {

                return {


                    ...state,
                    loading : false,
                    orders : action.payload
                }
            }

        case ALL_ORDER_DETAILS_FAIL:
            {
                return {
                    ...state,
                    loading : false,
                    error : action.payload

                }
            }

        default:
            {

                return state;
            }
    }

}



export const getMyOrderReducer = (state ={orders:[]},action) =>{




        switch(action.type)
        {
            case ORDER_MY_DETAILS_REQUEST:
                {
                    return {
                        ...state,
                        loading : true
                    }
                }

            case ORDER_MY_DETAILS_SUCCESS:
                {
                    return {
                        loading : false,
                        orders : action.payload
                    }
                }

            case ORDER_MY_DETAILS_FAIL:
                {
                    return {
                        loading : false,
                        error : action.payload
                    }
                }
            default :
            {
                return state;
            }
        }
}