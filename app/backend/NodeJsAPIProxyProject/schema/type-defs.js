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

  type SlackCredentials {
    _id: ID!
    username: String!
    currentchannelid: String!
    botusertoken: String!
    channels: [Channel!]!
  }

  type Channel {
    channelname: String!
    channelid: String!
  }

  type Query {
    getallworkspaces: [Workspace!]!
    getworkspace(id: ID!): Workspace!
    getworkspacesbyusername(username: String!): [Workspace!]!

    getallprojects: [Project!]!
    getproject(id: ID!): Project!
    getprojectsbyworkspace(workspaceid: ID!): [Project!]!

    sendMessage(
      userbottoken: String!
      channelid: String!
      message: String!
    ): String!
    getSlackCredentials(username: String!): SlackCredentials!
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

  input CreateSlackCredentialsInput {
    username: String!
    botusertoken: String!
    currentchannelid: String!
    channels: [ChannelInput!]!
  }

  input ChannelInput {
    channelname: String!
    channelid: String!
  }

  input UpdateSlackCredentialsInput {
    username: String!
    botusertoken: String!
    currentchannelid: String!
    channels: [ChannelInput!]!
  }

  type Mutation {
    createWorkspace(input: CreateWorkspaceInput!): Workspace!
    updateWorkspace(id: ID!, input: UpdateWorkspaceInput!): Workspace!
    deleteWorkspace(id: ID!): DeleteWorkspaceResponse!

    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): DeleteProjectResponse!

    createSlackCredentials(
      input: CreateSlackCredentialsInput!
    ): SlackCredentials!
    updateSlackCredentials(
      id: ID!
      input: UpdateSlackCredentialsInput!
    ): SlackCredentials!
  }







  type Summary {
    images: [String]
  }
  
  type Source {
    repoURL: String
    path: String
    targetRevision: String
  }
  
  type Resources {
    group: String
    version: String
    kind: String
    namespace: String
    name: String
    status: String
    message: String
    hookPhase: String
    syncPhase: String
  }
  
  type SyncResult {
    revision: String
    source: Source
    resources: [Resources]
  }
  
  type Retry {
    limit: Int
  }
  
  type InitiatedBy {
    automated: Boolean
  }
  
  type Sync {
    revision: String
    prune: Boolean
    syncOptions: [String]
  }
  
  type Operation {
    retry: Retry
    initiatedBy: InitiatedBy
    sync: Sync
  }
  
  type OperationState {
    phase: String
    message: String
    startedAt: String
    finishedAt: String
    syncResult: SyncResult
    operation: Operation
  }
  
  type History {
    revision: String
    deployedAt: String
    id: Int
    deployStartedAt: String
    source: Source
  }
  
  type Health {
    status: String
  }
  
  type Destination {
    server: String
    namespace: String
  }
  
  type ComparedTo {
    destination: Destination
    source: Source
  }
  
  type Status {
    reconciledAt: String
    sourceType: String
    summary: Summary
    operationState: OperationState
    history: [History]
    health: Health
    sync: Sync
    resources: [Resources]
  }
  
  type Automated {
    prune: Boolean
    selfHeal: Boolean
  }
  
  type SyncPolicy {
    syncOptions: [String]
    automated: Automated
  }
  
  type Spec {
    project: String
    syncPolicy: SyncPolicy
    destination: Destination
    source: Source
  }
  
  type ManagedFields {
    manager: String
    operation: String
    apiVersion: String
    time: String
    fieldsType: String
  }
  
  type Annotations {
    kubectlkubernetesiolastappliedconfiguration: String
  }
  
  type Metadata {
    name: String
    namespace: String
    uid: String
    resourceVersion: String
    generation: Int
    creationTimestamp: String
    managedFields: [ManagedFields]
    annotations: Annotations
  }
  
  type Items {
    status: Status
    spec: Spec
    metadata: Metadata
  }
  
  
  
  
  type MyObjectMetadata {
    resourceVersion: String
  }
  
  
  type JobListing {
  
    _id: ID!
    metadata: MyObjectMetadata!
    items: [Items]
    token: String!
  }
  
  
  
  #---------------------------------------------------------------------
  type Query {
    job(id: ID!): JobListing!
  }
  type Mutation {
    updateJobToken(id: ID!, token: String!): JobListing!
  }
`;

module.exports = { typeDefs };
