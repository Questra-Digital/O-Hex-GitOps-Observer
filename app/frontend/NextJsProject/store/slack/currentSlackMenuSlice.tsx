import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSlackMenu: "Notifications",
};

const currentSlackMenuSlice = createSlice({
  name: "currentSlackMenu",
  initialState,
  reducers: {
    setCurrentSlackMenu: (state, action) => {
      state.currentSlackMenu = action.payload;
    },
  },
});

export const { setCurrentSlackMenu} = currentSlackMenuSlice.actions;

export default currentSlackMenuSlice.reducer;
