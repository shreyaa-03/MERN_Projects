import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    fetchDone: false,
    currentlyFetching: false,
  },
  reducers: {
    fetchDone: (state) => {
      return (state.fetchDone = true);
    },
    fetchingStarted: (state) => {
      return (state.currentlyFetching = true);
    },
    fetchingFinished: (state) => {
      return (state.currentlyFetching = false);
    },
  },
});

export const loaderActions = loaderSlice.actions;
export default loaderSlice;
