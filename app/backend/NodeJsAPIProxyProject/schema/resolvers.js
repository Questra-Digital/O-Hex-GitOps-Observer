const { GraphQLClient, gql } = require("graphql-request");
const workspaceClient = new GraphQLClient("http://localhost:4001/query");
const projectClient = new GraphQLClient("http://localhost:4002/query");
const slackClient = new GraphQLClient("http://localhost:4004/query");

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
    // returns all workspaces by username
    getSlackCredentials: async (parent, args) => {
      const query = gql`
        query GetSlackCredentials($username: String!) {
          getSlackCredentials(username: $username) {
            _id
            username
            botusertoken
            channels {
              channelid
              channelname
            }
          }
        }
      `;
      const username = args.username;
      const data = await slackClient.request(query, { username: username });
      return data.getSlackCredentials;
    },
    // returns all workspaces by username
    sendMessage: async (parent, args) => {
      const query = gql`
        query sendMessage(
          $userbottoken: String!
          $channelid: String!
          $message: String!
        ) {
          sendMessage(
            userbottoken: $userbottoken
            channelid: $channelid
            message: $message
          )
        }
      `;
      const userbottoken= args.userbottoken;
      const channelid = args.channelid;
      const message = args.message;
      const data = await slackClient.request(query, {
        userbottoken: userbottoken,
        channelid: channelid,
        message: message,
      });
      return data.sendMessage;
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
    createSlackCredentials: async (parent, args) => {
      const credentials = args.input;
      console.log(credentials);
      const query = gql`
        mutation CreateSlackCredentials($input: CreateSlackCredentialsInput!) {
          createSlackCredentials(input: $input) {
            _id
            username
            botusertoken
            currentchannelid
            channels {
              channelid
              channelname
            }
          }
        }
      `;
      const data = await slackClient.request(query, { input: credentials });
      return data.createSlackCredentials;
    },
    updateSlackCredentials: async (parent, args) => {
      const credentials = args.input;
      const id = args.id;
      const query = gql`
        mutation UpdateSlackCredentials(
          $id: ID!
          $input: UpdateSlackCredentialsInput!
        ) {
          updateSlackCredentials(id: $id, input: $input) {
            username
            botusertoken
            currentchannelid
            channels {
              channelid
              channelname
            }
          }
        }
      `;
      const data = await slackClient.request(query, {
        id: id,
        input: credentials,
      });
      return data.updateSlackCredentials;
    },
  },
};

module.exports = { resolvers };
