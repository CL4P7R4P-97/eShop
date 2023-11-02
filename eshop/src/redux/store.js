
 

import { combineReducers } from 'redux';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import filterReducer from './slice/filterSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers(

    {
        auth: authReducer,
        product: productReducer,
        filter: filterReducer,

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