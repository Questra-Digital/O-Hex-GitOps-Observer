import { configureStore } from "@reduxjs/toolkit";
import workspacesReducer from "./store/workspace/workspaceSlice";
import projectsReducer from "./store/project/projectsSlice";
import projectReducer from "./store/project/projectSlice";
import currentWorkspaceIdReducer from "./store/workspace/currentWorkspaceSlice";
import currentSlackMenuReducer from "./store/slack/currentSlackMenuSlice";
import slackCredentialsReducer from "./store/slack/slackCredentialsSlice";

export const store = configureStore({
  reducer: {
    workspaces: workspacesReducer,
    projects: projectsReducer,
    currentWorkspaceId: currentWorkspaceIdReducer,
    project: projectReducer,
    currentSlackMenu: currentSlackMenuReducer,
    slackCredentials: slackCredentialsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
