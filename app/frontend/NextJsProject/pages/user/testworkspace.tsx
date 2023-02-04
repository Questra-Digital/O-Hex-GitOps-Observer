import React from "react";
import { useEffect } from "react";
import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { getWorkspaces } from "../../store/workspace/workspaceSlice";
import client from "../../apollo-client";

const GET_WORKSPACES_QUERY = gql`
  query getWorkspacesByUsername($username: String!) {
    getworkspacesbyusername(username: $username) {
      name
    }
  }
`;

const TestWorkspace = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_WORKSPACES_QUERY, {
    client,
    variables: { username: "ali2022" },
  });
  useEffect(() => {
    if (!loading && !error) {
      console.log(data.getworkspacesbyusername)
      dispatch(getWorkspaces(data.getworkspacesbyusername));
     
    }
  }, [dispatch, loading, error, data]);

  const workspaces = useSelector((state: RootState) => state.workspaces.workspaces);
  

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error! {error.message}</p>
      ) : (
        <ul>
          {workspaces.map((workspace: any) => (
            <li key={workspace.ID}>
              {workspace.name}
            </li>
          ))}

          
        </ul>
      )}
    </div>
  );
};
export default TestWorkspace;
