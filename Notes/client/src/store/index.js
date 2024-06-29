import { configureStore } from "@reduxjs/toolkit";
import showPasswordSlice from "./userAuthSlices/showPasswordSlice";

const store = configureStore({
  reducer: {
    showPasswordState: showPasswordSlice.reducer,
  },
});

export default store;
