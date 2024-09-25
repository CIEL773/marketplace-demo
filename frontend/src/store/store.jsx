import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productsSlice";
import userReducer from "../features/usersSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
