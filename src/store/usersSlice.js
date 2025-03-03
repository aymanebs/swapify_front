import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        access_token: localStorage.getItem('access_token'),
        isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    },
    reducers: {
        setLogin : (state, action) => {
            localStorage.setItem('access_token',action.payload);
            state.access_token = action.payload;
            localStorage.setItem('isLoggedIn',true);
            state.isLoggedIn = true;
        },
        setLogout: (state, action) =>{
            console.log('inside set logout reducer');
            localStorage.setItem('access_token','');
            state.access_token = '';
            localStorage.setItem('isLoggedIn','');
            state.isLoggedIn = false;
        }
    }

})

export const {setLogin, setLogout} = usersSlice.actions;
export default usersSlice.reducer;