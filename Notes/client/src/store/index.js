import { configureStore } from "@reduxjs/toolkit";
import userDetailSlice from "./Slices/userDetailSlice";
import resendVerificationSlice from "./Slices/resendVerificationSlice";

const store = configureStore({
  reducer: {
    users: userDetailSlice.reducer,
    resendVerification: resendVerificationSlice.reducer,
  },
});

export default store;
