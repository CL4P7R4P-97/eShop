import { createSlice } from '@reduxjs/toolkit'

const initialState = {
      
    products:[],
    minPrice: null,
    maxPrice: null,
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    STORE_PRODUCTS: (state,action)=>{

         console.log(action.payload);
        state.products =  action.payload.products;

    },
    GET_PRICE_RANGE: (state,action)=>{
          
      const {products} = action.payload;
      const arr = [];
      const prices = products.map((product)=>arr.push(product.price));
     
      console.log("geting max and min price");
      state.minPrice = Math.min(...arr);
      state.maxPrice = Math.max(...arr);

         

    },

  }
});

export const {STORE_PRODUCTS, GET_PRICE_RANGE} = productSlice.actions

export const selectProducts=(state, action)=> state.product.products;
export const selectMinPrice=(state, action)=> state.product.minPrice;
export const selectMaxPrice=(state, action)=> state.product.maxPrice;

export default productSlice.reducer