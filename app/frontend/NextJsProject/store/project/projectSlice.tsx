import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: {},
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    getProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const { getProject } = projectSlice.actions;

export default projectSlice.reducer;
