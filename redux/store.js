import { configureStore } from "@reduxjs/toolkit";
import userData from "./userSlice";
import sharedVariables from "./sharedVariables";

const Store = configureStore({
  reducer: {
    userData,
    sharedVariables,
  },
});

export default Store;
