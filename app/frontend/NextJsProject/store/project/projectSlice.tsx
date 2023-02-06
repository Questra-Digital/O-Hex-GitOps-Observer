import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    getProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { getProjects } = projectSlice.actions;

export default projectSlice.reducer;
