const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Workspace {
    _id: ID!
    name: String!
    username: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!

    getallworkspaces: [Workspace!]!
    getworkspace(id : ID!) : Workspace!
    getworkspacesbyusername(username : String!): [Workspace!]!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }

  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
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
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User

    createWorkspace(input: CreateWorkspaceInput!): Workspace!
    updateWorkspace(id: ID!, input: UpdateWorkspaceInput!): Workspace!
    deleteWorkspace(id: ID!): DeleteWorkspaceResponse!
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    UKRAINE
  }
`;

module.exports = { typeDefs };
