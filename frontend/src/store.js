import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer} from './reducers/productReducers.js';
import { cartReducer } from './reducers/cartReducers.js';
import { userLoginReducer,userRegisterReducer,userDetailsReducer,updateUserReducer } from './reducers/userReducers.js';
import { allOrdersReducer, orderCreateReducer,orderDetailsReducer,orderPayReducer } from './reducers/orderReducer.js';

const reducers = combineReducers({
    productList:productListReducer,
    product:productDetailsReducer,
    cart: cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails : userDetailsReducer,
    updateUser:updateUserReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    allOrders : allOrdersReducer
});


const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse( localStorage.getItem('cartItems')) :[];
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null;
const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null
const middleware = [thunk];
const initialState = {cart:{cartItems :cartItemsFromLocalStorage,shippingAddress},userLogin:{userInfo : userInfoFromLocalStorage},userRegister:{userInfo:userInfoFromLocalStorage}};
const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)));



export default store;