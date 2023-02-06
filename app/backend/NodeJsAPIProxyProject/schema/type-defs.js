const { gql } = require("apollo-server");

const typeDefs = gql`
  type Workspace {
    _id: ID!
    name: String!
    username: String!
  }

  type Project {
    _id: ID!
    name: String!
    owner: String!
    createdat: String!
    status: String
    description: String!
    workspaceid: ID!
    token: String
    collaborators: [String]
  }

  type Query {
    getallworkspaces: [Workspace!]!
    getworkspace(id: ID!): Workspace!
    getworkspacesbyusername(username: String!): [Workspace!]!

    getallprojects: [Project!]!
    getproject(id: ID!): Project!
    getprojectsbyworkspace(workspaceid: ID!): [Project!]!
  }

  input CreateWorkspaceInput {
    name: String!
    username: String!
  }

  input CreateProjectInput {
    name: String!
    description: String!
    owner: String!
    status: String
    createdat: String!
    workspaceid: ID!
    token: String
    collaborators: [String]
  }

  input UpdateWorkspaceInput {
    name: String
  }

  input UpdateProjectInput {
    name: String
    description: String
    status: String
    workspaceid: ID
    token: String
    collaborators: [String]
  }

  type DeleteWorkspaceResponse {
    deletedWorkspaceId: String!
  }

  type DeleteProjectResponse {
    deletedProjectId: String!
  }

  type Mutation {
    createWorkspace(input: CreateWorkspaceInput!): Workspace!
    updateWorkspace(id: ID!, input: UpdateWorkspaceInput!): Workspace!
    deleteWorkspace(id: ID!): DeleteWorkspaceResponse!

    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): DeleteProjectResponse!
  }
`;

module.exports = { typeDefs };
