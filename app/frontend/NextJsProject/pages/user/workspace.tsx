import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";

import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import ProjectList from "../../components/projectlist/ProjectList";
import client from "../../apollo-client";

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query getWorkspacesByUsername($username: String!) {
        getworkspacesbyusername(username: $username) {
          name
        }
      }
    `,
    variables: {
      username: "ali2022",
    },
  });

  return {
    props: {
      workspaces: data.getworkspacesbyusername,
    },
  };
}

const Workspace = ({ workspaces }: any) => {
  const [workspaceData, setWorkspaceData] = useState(workspaces);

  useEffect(() => {
    setWorkspaceData(workspaces);
  }, [workspaces]);

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
