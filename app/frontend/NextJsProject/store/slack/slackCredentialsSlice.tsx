import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slackCredentials: {},
};

const slackCredentialsSlice = createSlice({
  name: "slackCredentials",
  initialState,
  reducers: {
    getslackCredentials: (state, action) => {
      state.slackCredentials = action.payload;
    },
  },
});

export const { getslackCredentials } = slackCredentialsSlice.actions;

export default slackCredentialsSlice.reducer;
