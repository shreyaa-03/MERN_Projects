import { configureStore } from "@reduxjs/toolkit";
import userDetailSlice from "./Slices/userDetailSlice";

const store = configureStore({
  reducer: {
    users: userDetailSlice.reducer,
  },
});

export default store;
