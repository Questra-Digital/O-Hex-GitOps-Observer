import { gql, useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import type { RootState } from "../../store";
import ListHead from "./ListHead";
import ListBody from "./ListBody";
import client from "../../apollo-client";
import { getProjects } from "../../store/project/projectsSlice";
import AddProject from "../modal/AddProject";

const GET_PROJECTS_QUERY = gql`
  query Getprojectsbyworkspace($workspaceid: ID!) {
    getprojectsbyworkspace(workspaceid: $workspaceid) {
      createdat
      description
      name
      owner
      status
      _id
    }
  }
`;

const ProjectList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentWorkspaceId = useSelector(
    (state: RootState) => state.currentWorkspaceId.currentWorkspaceId
  );
  // Fetching workspaces data from database
  const { loading, error, data } = useQuery(GET_PROJECTS_QUERY, {
    client,
    variables: { workspaceid: currentWorkspaceId },
  });
  console.log("data : ", data);

  useEffect(() => {
    // storing data in redux
    if (!loading && !error) {
      console.log(data.getprojectsbyworkspace);
      dispatch(getProjects(data.getprojectsbyworkspace));
    }
  }, [dispatch, loading, error, data]);

  // Getting workspaces data from redux
  const projects = useSelector((state: RootState) => state.projects.projects);
  console.log(projects)
  const workspaces: any = useSelector(
    (state: RootState) => state.workspaces.workspaces
  );

  const handleWorkspaceSetting = () => {
    router.push({
      pathname: "workspace/setting/" + "ali2022",
    });
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h1 className="text-gray-700 font-semibold text-xl">Projects</h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block "
                type="text"
                name=""
                id=""
                placeholder="search..."
              />
            </div>
            <div className="lg:ml-40 ml-10 space-x-8">
              <button onClick={handleWorkspaceSetting} className="bg-teal-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                Workspace Settings
              </button>
            </div>
            <div className="lg:ml-40 ml-10 space-x-8">
              {/* <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                Add a Project
              </button> */}
              <AddProject />
            </div>
          </div>
        </div>
        {/* add project here */}

        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            {projects.length > 0 ? (
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <ListHead />
                  <ListBody projects={projects} />
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                  <span className="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                      Prev
                    </button>
                    &nbsp; &nbsp;
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-10 border border-gray-300 rounded bg-gray-100">
                <h2 className="text-2xl text-gray-900">No projects found</h2>
                <p className="text-gray-600">Please add one.</p>
              </div>
            )}
          </div>
        </div>

        {/* add project here */}
      </div>
    </div>
  );
};

export default ProjectList;
