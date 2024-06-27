import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    fetchDone: false,
    currentlyFetching: false,
  },
  reducers: {
    fetchDone: (state) => {
      state.fetchDone = true;
    },
    fetchingStarted: (state) => {
      state.currentlyFetching = true;
    },
    fetchingFinished: (state) => {
      state.currentlyFetching = false;
    },
  },
});

export const loaderActions = loaderSlice.actions;
export default loaderSlice;
