import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL, ORDER_HISTORY_CLEAR } from "../constants/orderConstants.js";

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
                    success : "Order Failed",
                    error : action.payload
                }
            }

        case ORDER_HISTORY_CLEAR:
            {
                return {
                    loading :false
                }
            }

        default :
        {
            return state;
        }
    }

}