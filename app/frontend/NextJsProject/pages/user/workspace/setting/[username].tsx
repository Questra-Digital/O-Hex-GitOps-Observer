import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import client from "../../../../apollo-client";
import { getWorkspaces } from "../../../../store/workspace/workspaceSlice";

import type { RootState } from "../../../../store";
import Header from "../../../../components/header/Header";

const GET_WORKSPACES_QUERY = gql`
  query getWorkspacesByUsername($username: String!) {
    getworkspacesbyusername(username: $username) {
      _id
      name
    }
  }
`;

const Setting = () => {
  // Getting workspaces data from redux
  const router = useRouter();

  //const { username } = router.query;
  const dispatch = useDispatch();

  const username = "ali2022"

  console.log("the username is " + username);

  // Fetching workspaces data from database
  const { loading, error, data } = useQuery(GET_WORKSPACES_QUERY, {
    client,
    variables: { username: username },
  });

  useEffect(() => {
    // storing data in redux
    if (!loading && !error) {
      dispatch(getWorkspaces(data.getworkspacesbyusername));
    }
  }, [dispatch, loading, error, data]);

  // Getting workspaces data from redux
  const workspaces = useSelector(
    (state: RootState) => state.workspaces.workspaces
  );

  const updateWorkspace = async () => {
    // make request to delete the workspace in the database
    // The two inputs are workspace name & username
    const { data } = await client.mutate({
      mutation: gql`
        mutation updateWorkspace($input: UpdateWorkspaceInput!) {
          updateWorkspace(input: $input) {
            id 
            name
          }
        }
      `,
      variables: {
        input: {
          id: 123,
          name: "ali2022",
        },
      },
    });
  };

  const deleteWorkspace = async () => {
    // make request to delete the workspace in the database
    // The two inputs are workspace name & username
    const { data } = await client.mutate({
      mutation: gql`
        mutation deleteWorkspace($id: workspace._id, $name: workspace.name) {
          deleteWorkspace(input: $input) {
            id
            name
          }
        }
      `,
      variables: {
        input: {
          id: 123,
          name: "ali2022",
        },
      },
    });
  };

  return (
    <div>
      <Header />
      <h1 className="text-center mt-5 mb-5 text-2xl">
        Workspace settings
      </h1>
      <div className="mt-5 w-3/4">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="mx-auto shadow-lg">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Update
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workspaces.map((workspace: any, idx: any) => {
                    return (
                      <tr className="border-b" key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {idx+1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {workspace._id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {workspace.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button onClick={updateWorkspace} className="bg-teal-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                            Update
                          </button>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button onClick={deleteWorkspace} className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;