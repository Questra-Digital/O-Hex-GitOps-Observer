const { GraphQLClient, gql } = require("graphql-request");
const workspaceClient = new GraphQLClient("http://localhost:4001/query");
const projectClient = new GraphQLClient("http://localhost:4002/query");

const resolvers = {
  Query: {
    // It will return all workspaces in the database
    getallworkspaces: async () => {
      const query = gql`
        query {
          getallworkspaces {
            _id
            name
            username
          }
        }
      `;
      const data = await workspaceClient.request(query);
      return data.getallworkspaces;
    },

    // returns all workspaces by username
    getworkspacesbyusername: async (parent, args) => {
      const query = gql`
        query ($username: String!) {
          getworkspacesbyusername(username: $username) {
            _id
            name
            username
          }
        }
      `;
      const username = args.username;
      const data = await workspaceClient.request(query, { username: username });
      return data.getworkspacesbyusername;
    },

    // get projects by workspace
    getprojectsbyworkspace: async (parent, args) => {
      const query = gql`
        query ($workspaceid: ID!) {
          getprojectsbyworkspace(workspaceid: $workspaceid) {
            _id
            name
            description
            owner
            createdat
            token
            status
            collaborators
            workspaceid
          }
        }
      `;
      const workspaceid = args.workspaceid;
      const data = await projectClient.request(query, {
        workspaceid: workspaceid,
      });
      return data.getprojectsbyworkspace;
    },
    // Get a project by ID
    getproject: async (parent, args) => {
      const query = gql`
        query ($id: ID!) {
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
      const id = args.id;
      const data = await projectClient.request(query, { id: id });
      return data.getproject;
    },
  },

  Mutation: {
    createWorkspace: async (parent, args) => {
      const workspace = args.input;
      const query = gql`
        mutation CreateWorkpace($input: CreateWorkspaceInput!) {
          createWorkspace(input: $input) {
            _id
            name
            username
          }
        }
      `;
      const data = await workspaceClient.request(query, { input: workspace });
      return data.createWorkspace;
    },
    createProject: async (parent, args) => {
      const project = args.input;
      const query = gql`
        mutation CreateProject($input: CreateProjectInput!) {
          createProject(input: $input) {
            _id
            name
            description
            owner
            workspaceid
            status
            token
            createdat
            collaborators
          }
        }
      `;
      const data = await projectClient.request(query, { input: project });
      return data.createProject;
    },
  },
};

module.exports = { resolvers };
