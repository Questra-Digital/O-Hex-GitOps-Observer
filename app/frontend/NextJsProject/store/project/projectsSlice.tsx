import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    getProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { getProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
