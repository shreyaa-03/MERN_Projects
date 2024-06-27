import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemsSlice";
import loaderSlice from "./loaderSlice";
import bagSlice from "./bagSlice";

const store = configureStore({
  reducer: {
    items: itemSlice.reducer,
    loader: loaderSlice.reducer,
    bag: bagSlice.reducer,
  },
});

export default store;
