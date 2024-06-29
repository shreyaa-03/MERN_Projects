import { configureStore } from "@reduxjs/toolkit";
import showPasswordSlice from "./userAuthSlices/showPasswordSlice";
import authPageSlice from "./userAuthSlices/authPageSlice";

const store = configureStore({
  reducer: {
    showPasswordState: showPasswordSlice.reducer,
    page: authPageSlice.reducer,
  },
});

export default store;
