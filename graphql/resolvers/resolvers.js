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
    book: async (parent, args, context) => {
      return await getOrAdd('myKey1', () => {
        //Fetch daata database
        const res = books.find(b => b.id === +args.id);
        return res;
      });
    }
  }
};
