// src/features/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user signin
export const signinUser = createAsyncThunk(
    "user/signin",
    async (formData, { rejectWithValue }) => {
        try {
            // const response = await axios.post(`${API_URL}/api/users/signin`, formData);
            const response = await axios.post("http://localhost:4000/api/users/signin", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const usersSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null, 
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default usersSlice.reducer;
