import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        access_token: localStorage.getItem('access_token'),
        isLoggedIn: localStorage.getItem('isLoggedIn') || false,
        loggedUser: JSON.parse(localStorage.getItem('user') || '{}') ,
    },

    reducers: {
        setLogin : (state, action) => {
            localStorage.setItem('access_token',action.payload);
            state.access_token = action.payload;
            localStorage.setItem('isLoggedIn',true);
            state.isLoggedIn = true;     
            const decodedToken = jwtDecode(action.payload);
            localStorage.setItem('user', JSON.stringify(decodedToken._doc));
            state.loggedUser = decodedToken._doc;

        },
        setLogout: (state, action) =>{
            console.log('inside set logout reducer');
            localStorage.setItem('access_token','');
            state.access_token = '';
            localStorage.setItem('isLoggedIn','');
            state.isLoggedIn = false;
            localStorage.setItem('user', '');
            state.loggedUser = {};
        }
    }

})

export const {setLogin, setLogout} = usersSlice.actions;
export default usersSlice.reducer;