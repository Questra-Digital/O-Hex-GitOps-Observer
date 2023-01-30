import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import ProjectList from "../../components/projectlist/ProjectList";
import client from "../../Apollo-client";
import { gql } from "@apollo/client";



export async function getStaticProps() {
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
  

  return (
    <div>
      <Header />

      <div className="flex flex-row">
        <div className="basis-1/5">
          <Sidebar workspaces={workspaces}/>
        </div>
        <div className="basis-4/5">
          <ProjectList />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
