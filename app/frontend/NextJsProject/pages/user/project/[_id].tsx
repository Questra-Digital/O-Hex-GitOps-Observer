import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import client from "../../../apollo-client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../../store/project/projectSlice";
import type { RootState } from "../../../store";
import Header from "../../../components/header/Header";

const GET_PROJECT_QUERY = gql`
  query GetProject($id: ID!) {
    getproject(id: $id) {
      _id
      name
      description
      status
      createdat
      collaborators
      workspaceid
    }
  }
`;
const Project = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { _id } = router.query;

  const { loading, error, data } = useQuery(GET_PROJECT_QUERY, {
    client,
    variables: { id: _id },
  });

  useEffect(() => {
    // storing data in redux
    if (!loading && !error) {
      console.log(data.getproject);
      dispatch(getProject(data.getproject));
    }
  }, [dispatch, loading, error, data]);

  const project: any = useSelector((state: RootState) => state.project.project);

  return (
    <div>
      <Header />
      <div>
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h1 className="text-gray-700 text-3xl">Project</h1>
            </div>
            <div className="flex items-center justify-between"></div>
          </div>
        </div>
      </div>
      
      {/* here */}
      <div className="w-full bg-dark">
        <div className=" p-8  w-3/4">
          <div className="flex items-center justify-between p-6 w-3/4"
          style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)" }}
          >
            <div>
              <h1 className="text-gray-700 font-semibold ">Id</h1>
              <h1 className="text-gray-700  ">{project._id}</h1>
              <br />
              <h1 className="text-gray-700 font-semibold ">Name</h1>
              <h1 className="text-gray-700  ">{project.name}</h1>
              <br />
              <h1 className="text-gray-700 font-semibold ">Description</h1>
              <h1 className="text-gray-700  ">{project.description}</h1>
              <br />
              <h1 className="text-gray-700 font-semibold ">Status</h1>
              <h1 className="text-gray-700  ">{project.status}</h1>
              <br />
              <div className="space-x-8">
                <button className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  Update
                </button>

                <button className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  Delete
                </button>
                <button className="bg-gray-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  Dashboard
                </button>
                <button className="bg-gray-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  Add Token/URL
                </button>
                <button className="bg-gray-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  Add Collaborators
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
