const books = require('../../data/books.json');

module.exports = {
  Query: { books: () => books }
};
