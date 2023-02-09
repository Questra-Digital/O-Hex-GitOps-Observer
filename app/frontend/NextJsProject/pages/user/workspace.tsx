import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../store";
import { getWorkspaces } from "../../store/workspace/workspaceSlice";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import ProjectList from "../../components/projectlist/ProjectList";
import client from "../../apollo-client";

const GET_WORKSPACES_QUERY = gql`
  query getWorkspacesByUsername($username: String!) {
    getworkspacesbyusername(username: $username) {
      _id
      name
    }
  }
`;

const Workspace = () => {
  const dispatch = useDispatch();

  // Fetching workspaces data from database
  const { loading, error, data } = useQuery(GET_WORKSPACES_QUERY, {
    client,
    variables: { username: "ali2022" },
  });

  useEffect(() => {
    // storing data in redux
    if (!loading && !error) {
      console.log(data.getworkspacesbyusername);
      dispatch(getWorkspaces(data.getworkspacesbyusername));
    }
  }, [dispatch, loading, error, data]);

  // Getting workspaces data from redux
  const workspaces = useSelector(
    (state: RootState) => state.workspaces.workspaces
  );

  return (
    <div>
      <Header />

      <div className="flex flex-row">
        <div className="basis-1/5">
          <Sidebar workspaces={workspaces} />
        </div>
        <div className="basis-4/5">
          <ProjectList />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
