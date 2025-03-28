import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


const token = localStorage.getItem("access_token");
let isTokenValid = false;
let decodedUser = {};

if (token) {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
            isTokenValid = true;
            decodedUser = decodedToken._doc;
        } else {
            localStorage.clear(); 
        }
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.clear(); 
    }
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        access_token: localStorage.getItem('access_token'),
        isLoggedIn: localStorage.getItem('isLoggedIn') || false,
        loggedUser: JSON.parse(localStorage.getItem('user') || "{}" ) ,
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