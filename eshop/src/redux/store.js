
 

import { combineReducers } from 'redux';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import filterReducer from './slice/filterSlice';
import checkoutReducer from './slice/checkoutSlice';

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import orderReducer from './slice/orderSlice';

const rootReducer = combineReducers(

    {
        auth: authReducer,
        product: productReducer,
        filter: filterReducer,
        cart: cartReducer,
        checkout:checkoutReducer,
        orders: orderReducer,

    }
);
const store = configureStore(
    
        {
            reducer: rootReducer,
            //to remove serializable check error
            middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
        }
     
);

export default store;