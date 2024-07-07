import {
  createAsyncThunk,
  createSlice,
  // rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userDetailSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    loginStatus: 'idle'
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state when a new request starts
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Access custom error payload here
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Store logged-in user info
        state.loginStatus = 'succeeded'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userDetailActions = userDetailSlice.actions;
export default userDetailSlice;
