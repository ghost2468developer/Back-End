import { gql } from "apollo-server-express"

export const schema = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    number: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    user: [User!]!
    useraccount(id: ID!): User!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      number: String!
    ): User!

    updateUser(
      id: ID!
      name: String
      email: String
      password: String
      number: String
    ): User!

    deleteUser(id: ID!): User!
  }`