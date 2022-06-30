import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer} from './reducers/productReducers.js';
import { cartReducer } from './reducers/cartReducers.js';
import { userLoginReducer,userRegisterReducer } from './reducers/userReducers.js';


const reducers = combineReducers({productList:productListReducer,product:productDetailsReducer,cart: cartReducer,userLogin:userLoginReducer,userRegister:userRegisterReducer});


const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse( localStorage.getItem('cartItems')) :[];
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null;

const middleware = [thunk];
const initialState = {cart:{cartItems :cartItemsFromLocalStorage},userLogin:{userInfo : userInfoFromLocalStorage},userRegister:{userInfo:userInfoFromLocalStorage}};
const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)));



export default store;