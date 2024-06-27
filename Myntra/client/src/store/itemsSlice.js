/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import items from "../data/items";

const itemSlice = createSlice({
  name: "items",
  initialState: items,
  reducers: {
    addInitialItems: (store, action) => {
      let newStore = store;
      return newStore;
    },
  },
});

export const itemsAction = itemSlice.actions;
export default itemSlice;
