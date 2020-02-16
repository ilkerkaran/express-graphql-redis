const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    me: User
    user(id: ID!): User
    book(id: ID!): Book
    books: [Book!]
  }
  type User {
    id: ID!
    username: String!
  }
  type Book {
    id: ID!
    title: String!
    author: String!
  }
`;
