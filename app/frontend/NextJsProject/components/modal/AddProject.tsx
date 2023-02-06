import React from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Router from "next/router";

export default function AddProject() {
  // to open and close the add workspace model
  const [showModal, setShowModal] = React.useState(false);

  // input for workspace name when adding a new one
  const [projectName, setProjectName] = React.useState("");
  const [projectDesc, setProjectDesc] = React.useState("");

  function getDate() {
    var date = new Date();
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }

  const handleAdd = async () => {

    console.log("name " + projectName + " desc " + projectDesc )
    // make request to add the a new workspace in the database
    // The two inputs are workspace name & username
    const { data } = await client.mutate({
      mutation: gql`
        mutation AddProject($input: CreateProjectInput!) {
          createProject(input: $input) {
            name
            description
            owner
            workspaceid
            status 
            token
            collaborators 
            createdat
          }
        }
      `,
      variables: {
        input: {
          name: projectName,
          description: projectDesc,
          owner: "ali2022",
          workspaceid: "63c588bbed42978f7c08be33",
          createdat: getDate(),
          status: "active"
        },
      },
    });

    // once added, empty the input box
    Router.reload();
    setProjectName("");
    setProjectDesc("");
  };

  return (
    <>
      {/* appears on the sidebar to add a new workspace  */}
      <button
        className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Project
      </button>

      {/* model will only appear, if the add workspace button has been clicked  */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Project</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  <div>
                    <input
                      type="text"
                      id="first_name"
                      className=" border border-gray-300 text-red-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Workspace name..."
                      required
                      onChange={(e) => setProjectName(e.target.value)}
                      value={projectName}
                    />
                  </div>

                  <div>
                    <textarea
                      
                      id="first_name"
                      className=" border border-gray-300 text-red-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Workspace name..."
                      required
                      onChange={(e) => setProjectDesc(e.target.value)}
                      value={projectDesc}
                    />
                  </div>
                </div>
                {/* footer, containing close and save button */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAdd}
                    // onClick={() => setShowModal(false)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
