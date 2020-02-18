const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    book(id: ID!): Book
    books: [Book!]
  }
  type Book {
    id: ID!
    title: String!
    author: String!
  }
`;
