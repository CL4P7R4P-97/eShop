import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {

    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],

    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL: "",


}
console.log()

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {


    ADD_TO_CART:(state,action)=>{

        // console.log(action.payload);
        
        let productIndex = state.cartItems.findIndex((product)=>product.id === action.payload.id);

        if(productIndex >=0){

            state.cartItems[productIndex].quantity += 1;
            state.cartTotalQuantity+= 1;
            toast.success("One more "+ action.payload.name + " added to the cart", {position:"top-left"});
            
        }
        else{
            const item = {...action.payload, quantity: 1};
            state.cartItems.push(item);
            state.cartTotalQuantity+= 1;
            toast.success(action.payload.name + " added to the cart", {position:"top-left"});
           
        }

        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));

        state.cartTotalQuantity += 1;
        

    },


    DECREASE_CART: (state, action)=>{

        let productIndex = state.cartItems.findIndex((product)=>product.id === action.payload.id);

        if(productIndex >=0 ){
            
            if(state.cartItems[productIndex].quantity >1){
               
                state.cartItems[productIndex].quantity -= 1;
            state.cartTotalQuantity-= 1;
            
            }
            else{

                let q = action.payload.quantity;
        let finalCart = state.cartItems.filter((product)=>product.id !== action.payload.id);
        
         state.cartTotalQuantity -= q;
         state.cartItems = finalCart;
           

            }

            

            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            
        }
       
    },
    REMOVE_FROM_CART: (state, action)=>{
 
        let q = action.payload.quantity;
        let finalCart = state.cartItems.filter((product)=>product.id !== action.payload.id);
       
         state.cartTotalQuantity -= q;
         state.cartItems = finalCart;
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            
           

    },
    CALCULATE_SUBTOTAL:(state,action)=>{
        
        let totalAmount = 0;
       state.cartItems.map((item)=>{
           
            totalAmount += item.price*item.quantity;
        });
        state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY:(state,action)=>{

    let totalQuantity = 0;
    state.cartItems.map((item)=>{
        
        totalQuantity += item.quantity;
     });
     state.cartTotalQuantity = totalQuantity;


  },

  CLEAR_CART:(state,action)=>{

    state.cartItems = [];
    state.cartTotalAmount = 0;
    state.cartTotalQuantity = 0;
  },

  SAVE_URL:(state,action)=>{

    state.previousURL = action.payload;

  },

        
  }
});

export const {SAVE_URL,ADD_TO_CART,CALCULATE_TOTAL_QUANTITY, DECREASE_CART,CALCULATE_SUBTOTAL, REMOVE_FROM_CART, CLEAR_CART} = cartSlice.actions;

export const selectPreviousURL=(state)=>state.cart.previousURL;
export const selectCartItems=(state)=>state.cart.cartItems;
export const selectCartTotalQuantity=(state)=>state.cart.cartTotalQuantity;
export const selectCartTotalAmount=(state)=>state.cart.cartTotalAmount;

export default cartSlice.reducer