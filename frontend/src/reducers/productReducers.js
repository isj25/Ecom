import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL} from "../constants/productConstants.js";
import {PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL} from "../constants/productConstants.js";


const productListReducer = (state={products : []},action)=>{

    switch(action.type)
    {
            case PRODUCT_LIST_REQUEST:
                    return {loading : true,products:[],error:''};
            case  PRODUCT_LIST_SUCCESS:
                    return {loading: false,products : action.payload ,error:''};
            case PRODUCT_LIST_FAIL:
                    return {loading : false, error: action.payload,products:[]};
            default:
                    return state;
    }
}


const productDetailsReducer = (state = {product :{rating:0,numReviews:0}},action) =>{


    switch(action.type)
    {
        case PRODUCT_DETAILS_REQUEST:
            return {...state,loading : true};
        case  PRODUCT_DETAILS_SUCCESS:
                return {...state,loading: false,product : action.payload};
        case PRODUCT_DETAILS_FAIL:
                return {...state,loading : false, error: action.payload};
        default:
                return state;
    }
}


export {productListReducer,productDetailsReducer};