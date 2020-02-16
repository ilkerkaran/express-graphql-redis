const books = require('../../data/books.json');
module.exports = {
  Query: {
    me: () => {
      return {
        username: 'Robin Wieruch'
      };
    },
    user: (parent, args) => {
      console.log(parent, args);
      return {
        username: 'Dave Davids'
      };
    },
    books: () => books,
    book: (parent, args) => {
      const res = books.find(b => b.id === +args.id);
      console.log(args);
      return res;
    }
  }
};
