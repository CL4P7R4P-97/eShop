import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    filteredProducts: [],


}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {

    FILTER_BY_SEARCH: (state,action)=>{

        const {products, search} = action.payload;
        
        const tempProducts = products.filter((product)=> product.name.toLowerCase().includes(search.toLowerCase())||product.category.toLowerCase().includes(search.toLowerCase()));

        state.filteredProducts = tempProducts;
    },

    FILTER_BY_SORT: (state, action)=>{

          const {products, sort} = action.payload;
          let tempProducts = [];
          if(sort === "latest"){
            tempProducts = products;
             
          }
          else if(sort === "lowest-price"){
            //react freezes the array
            tempProducts = products.slice().sort((a,b)=> {return a.price - b.price});
          }
          else if(sort === "highest-price"){
            //react freezes the array
            tempProducts = products.slice().sort((a,b)=> {return b.price - a.price});
          }
          else if(sort === "a-z"){
            tempProducts = products.slice().sort((a,b)=>{return a.name.localeCompare(b.name)})
          }
          else{
            tempProducts = products.slice().sort((a,b)=>{return b.name.localeCompare(a.name)})
          }

          state.filteredProducts = tempProducts;
    },
  }
});

export const {FILTER_BY_SEARCH, FILTER_BY_SORT} = filterSlice.actions;

export const selectFilteredProducts = (state)=> state.filter.filteredProducts;

export default filterSlice.reducer;