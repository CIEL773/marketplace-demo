import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all products in cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token in cartslice", token); // correct
      // const userInfo = localStorage.getItem("userInfo")

      const response = await axios.get(
        "http://localhost:4000/api/users/getCart",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      //        console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating the cart (PATCH /api/users/updateCart)
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      const response = await axios.patch(
        "http://localhost:4000/api/users/updateCart",
        cartData, // Pass the updated cart data (e.g., items, quantities)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      return response.data.cart; // Return the updated cart data from the server
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], // Array to hold cart items
    loading: false, // Loading state for async operations
    error: null, // Error state
  },
  reducers: {
    clearCart(state) {
      state.cartItems = []; // Action to clear the cart locally (for signout, etc.)
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching the cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload; // Save the fetched cart items
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error
      })

      // Handle updating the cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload; // Update the cart items
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error
      });
  },
});

// Export the action to clear the cart
export const { clearCart } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
