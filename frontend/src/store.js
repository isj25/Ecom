import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer} from './reducers/productReducers.js';



const reducers = combineReducers({productList:productListReducer,product:productDetailsReducer});

const middleware = [thunk];
const initialState = {};
const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)));



export default store;