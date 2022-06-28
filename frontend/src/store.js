import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer} from './reducers/productReducers.js';
import { cartReducer } from './reducers/cartReducers.js';


const reducers = combineReducers({productList:productListReducer,product:productDetailsReducer,cart: cartReducer});


const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse( localStorage.getItem('cartItems')) :[];

const middleware = [thunk];
const initialState = {cart:{cartItems :cartItemsFromLocalStorage}};
const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)));



export default store;