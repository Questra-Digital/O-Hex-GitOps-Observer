const { gql } = require("apollo-server");

const typeDefs = gql`
  type Workspace {
    _id: ID!
    name: String!
    username: String!
  }

  type Query {
    getallworkspaces: [Workspace!]!
    getworkspace(id: ID!): Workspace!
    getworkspacesbyusername(username: String!): [Workspace!]!
  }

  input CreateWorkspaceInput {
    name: String!
    username: String!
  }

  input UpdateWorkspaceInput {
    name: String
  }

  type DeleteWorkspaceResponse {
    deletedWorkspaceId: String!
  }

  type Mutation {
    createWorkspace(input: CreateWorkspaceInput!): Workspace!
    updateWorkspace(id: ID!, input: UpdateWorkspaceInput!): Workspace!
    deleteWorkspace(id: ID!): DeleteWorkspaceResponse!
  }
`;

module.exports = { typeDefs };
