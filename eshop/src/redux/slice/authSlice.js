//rxslice
 
import { createSlice } from '@reduxjs/toolkit';
const initialState = {

      isLoggedIn: false,
      email: null,
      userName: null,
      userID: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    SET_ACTIVE_USER: (state,action) =>{

        // console.log(action.payload);
        const {email, userName, userID} = action.payload;
        state.isLoggedIn = true;
        state.email = email;
        state.userID = userID;
        state.userName = userName;


    },

    REMOVE_ACTIVE_USER: (state,action) =>{

        console.log(action.payload);
        
        state.isLoggedIn = false;
        state.email = null;
        state.userID = null;
        state.userName = null;


    }

  }
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUsername = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer