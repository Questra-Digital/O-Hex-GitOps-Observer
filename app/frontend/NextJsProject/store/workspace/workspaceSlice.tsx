import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaces: [],
};

const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    getWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    }
  },
});

export const { getWorkspaces } = workspaceSlice.actions;

export default workspaceSlice.reducer;
