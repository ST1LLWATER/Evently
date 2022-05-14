import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
      };
    },
    loadUserData: (state, action) => {
      let userData = localStorage.getItem("userData");
      if (userData) {
        const parsedItems = JSON.parse(userData);
        return {
          ...state,
          ...parsedItems,
        };
      } else {
        return state;
      }
    },
  },
});

export default userData.reducer;
export const { setUserData, loadUserData } = userData.actions;
