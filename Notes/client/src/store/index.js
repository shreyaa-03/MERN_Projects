import { configureStore } from "@reduxjs/toolkit";
import showPasswordSlice from "./showPasswordSlice";

const store = configureStore({
  reducer: {
    showPasswordState: showPasswordSlice.reducer,
  },
});

export default store;
