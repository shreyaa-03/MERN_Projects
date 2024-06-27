/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addInitialItems: (state,action) => {
      return action.payload;
    },
  },
});

export const itemsAction = itemSlice.actions;
export default itemSlice;
