import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL = 'http://localhost:4000'

// initialize userToken from local storage
const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null

// Async thunk for user signin
export const signinUser = createAsyncThunk(
    "user/signin",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${backendURL}/api/users/signin`, formData);
            console.log("response: ", response);
            console.log("response.data: ", response.data);

            // Store user data in localStorage (adjust keys as needed)
            // userInfo = {
            //     ...userInfo,
            //     token: action.payload.token,
            //     address: action.payload.address,
            //   };
            localStorage.setItem('token', response.data.token);
            const { user, token } = response.data;

            const userInfo = {
                ...user,
                token: token, // Add token to the userInfo
                address: user.address || {}, // Optional: Add address if it exists
              };

            localStorage.setItem("userInfo", JSON.stringify(response.data.user));  // Store user info

            return userInfo;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
    "user/signup",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${backendURL}/api/users/signup`, formData);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Async thunk  for user signout
export const signoutUser = createAsyncThunk(
    "user/signout",
    async (_, { rejectWithValue }) => {
        try {
            await axios.post(`${backendURL}/api/users/signout`);
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');

            dispatch({
                type: 'user/signout',
            });

        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Async thunk for password reset
export const passwordReset = createAsyncThunk(
    "user/passwordReset",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${backendURL}/api/users/resetPassword`, { email });
            return response.data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Update user address
export const updateUserAddress = createAsyncThunk(
    'user/updateUserAddress',
    async ({address}, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token in localStorage:", token);

            const response = await axios.put(`${backendURL}/api/users/updateAddress`, address, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

//Update user password after login
export const updateUserPassword = createAsyncThunk(
    'user/updatePassword',
    async ({ userId, password }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.put(
                `${backendURL}/api/users/updatePassword`, password,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update password");
        }
    }
);


const usersSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null, // for user object
        token, // for storing token
        loading: false,
        error: null,
        success: false, // for monitoring the registration process
        resetMessage: "",
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle signin
            .addCase(signinUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.error = null;
                state.success = true;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.error = null;
                state.success = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle signout
            .addCase(signoutUser.fulfilled, (state) => {
                state.userInfo = null;
                state.success = false;
            })

            // Handle passwordReset
            .addCase(passwordReset.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(passwordReset.fulfilled, (state, action) => {
                state.loading = false;
                state.resetMessage = action.payload;
                state.error = null;
                state.success = true;
            })
            .addCase(passwordReset.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateUserAddress.fulfilled, (state, action) => {
                state.userInfo = {
                  ...state.userInfo,
                  address: action.payload.address,
                };
                localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
            });
    },
});

export default usersSlice.reducer;
export const { setUserInfo, clearUserInfo } = usersSlice.actions;