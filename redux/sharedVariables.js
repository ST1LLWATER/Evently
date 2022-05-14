import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  isLoggedIn: false,
  classMembersDrawer: false,
  shouldAnimate: true,
};

const sharedVariables = createSlice({
  name: "sharedVariables",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      return {
        ...state,
        allUsers: action.payload,
      };
    },
    toggleClassMenu: (state, action) => {
      return {
        ...state,
        classMembersDrawer: !state.classMembersDrawer,
      };
    },
    loadMembers: (state, action) => {
      let members = localStorage.getItem("members");
      if (userData) {
        const parsedItems = JSON.parse(members);
        return {
          ...state,
          allUsers: [...parsedItems],
        };
      } else {
        return state;
      }
    },
    negateShouldAnimate: (state, action) => {
      localStorage.setItem("shouldAnimate", false);
      return {
        ...state,
        shouldAnimate: false,
      };
    },
  },
});

export default sharedVariables.reducer;
export const { setAllUsers, toggleClassMenu, negateShouldAnimate } =
  sharedVariables.actions;
