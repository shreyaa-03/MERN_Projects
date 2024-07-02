import { createSlice } from "@reduxjs/toolkit";

const userDetailSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
});

export default userDetailSlice