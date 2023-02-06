import { configureStore } from "@reduxjs/toolkit";
import workspacesReducer from "./store/workspace/workspaceSlice";
import projectsReducer from "./store/project/projectSlice";

export const store = configureStore({
  reducer: {
    workspaces: workspacesReducer,
    projects: projectsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
