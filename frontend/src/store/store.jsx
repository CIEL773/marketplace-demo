import {configureStore} from "@reduxjs/toolkit";
import productReducer from "../features/productsSlice"
import userReducer from "../features/usersSlice"

export const store = configureStore({
    reducer:{
        user: userReducer,
        product: productReducer,
    }
});
