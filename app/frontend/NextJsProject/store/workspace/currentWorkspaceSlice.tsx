import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWorkspaceId: "",
};

const currentWorkspaceIdSlice = createSlice({
  name: "currentWorkspaceId",
  initialState,
  reducers: {
    setCurrentWorkspaceId: (state, action) => {
      state.currentWorkspaceId = action.payload;
    },
  },
});

export const { setCurrentWorkspaceId } = currentWorkspaceIdSlice.actions;

export default currentWorkspaceIdSlice.reducer;
