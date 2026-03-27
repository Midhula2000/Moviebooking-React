import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        admin: null,
        user: null
    },
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload;
            window.localStorage.setItem('user',JSON.stringify(action.payload))
        },
        removeUser: (state)=>{
            state.user = null;
            window.localStorage.removeItem('user')
        },
        setAdmin: (state, action) => {
            state.admin = action.payload;
            window.localStorage.setItem('admin',JSON.stringify(action.payload))
          },
          removeAdmin: (state)=>{
            state.admin = null;
        },
        // setUserFromLocalStorage: (state)=>{
        //     var user = window.localStorage.getItem('user');
        //     if(user){
        //         user = JSON.parse(user);
        //         state.user = user;
        //     }else{
        //         state.user = null;
        //     }
        // }
        setUserFromLocalStorage: (state) => {
            try {
                const userJson = window.localStorage.getItem('user');
                if (userJson) {
                    const user = JSON.parse(userJson);
                    state.user = user;
                } else {
                    state.user = null;
                }
            } catch (error) {
                console.error('Failed to parse user from localStorage:', error);
                state.user = null;
            }
        }
        
    }
});

export const {setUser, removeUser,setUserFromLocalStorage,setAdmin,removeAdmin} = authSlice.actions




export default authSlice.reducer;
