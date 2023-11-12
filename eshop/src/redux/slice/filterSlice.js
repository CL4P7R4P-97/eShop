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
    FILTER_BY_CATEGORY: (state, action)=>{
          
      const {products, category, price} = action.payload;
      console.log(category);
           if(category === "All"){
            state.filteredProducts = products;
            
           }
           
           else{
            console.log(category, price);
            state.filteredProducts = products.filter((product)=>product.category === category && product.price <= price);
           }
  },
  FILTER_BY_BRAND:(state,action)=>{
           
    const {products, brand,price, category} = action.payload;
    console.log("finding for brand", brand, + " " + brand.length);
     
         if(brand === "All"){
          state.filteredProducts = products.filter((product)=>product.price <= price && product.category === category);
          
         }
         
         else{
          state.filteredProducts = products.filter((product)=>(product.category === category && product.brand === brand) && (product.price <= price))
         }
       
  },
  FILTER_BY_PRICE:(state,action)=>{

     const {products, price, category, brand} = action.payload;
     console.log(action.payload);

     if(category === "All" && brand === "All"){
           
      state.filteredProducts = products;
     }

     else if(brand === "All"){

      state.filteredProducts = products.filter((product)=>product.category === category && product.price <= price);
     }
     
      else{
        let f = products.filter((product)=>product.price <= price && (product.brand == brand ));
      console.log("after filtering products" + f);
      state.filteredProducts = f;
      }
  }

}});

export const {FILTER_BY_SEARCH, FILTER_BY_SORT, FILTER_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE} = filterSlice.actions;

export const selectFilteredProducts = (state)=> state.filter.filteredProducts;

export default filterSlice.reducer;