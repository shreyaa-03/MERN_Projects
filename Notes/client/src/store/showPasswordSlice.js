import { createSlice } from "@reduxjs/toolkit";

const showPasswordSlice = createSlice({
  name: "showPasswordState",
  initialState: { showPassword: false },
  reducers: {
    showPassword: (state) => {
      state.showPassword = true;
    },
    hidePassword: (state) => {
      state.showPassword = false;
    },
  },
});

export const showPasswordActions = showPasswordSlice.actions;
export default showPasswordSlice;
