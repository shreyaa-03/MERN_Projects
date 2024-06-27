import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemsSlice";
import loaderSlice from "./loaderSlice";

const store = configureStore({
  reducer: {
    items: itemSlice.reducer,
    loader: loaderSlice.reducer,
  },
});

export default store;
