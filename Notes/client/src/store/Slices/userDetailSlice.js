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

const userDetailSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
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
      });
  },
});

export const userDetailActions = userDetailSlice.actions;
export default userDetailSlice;
