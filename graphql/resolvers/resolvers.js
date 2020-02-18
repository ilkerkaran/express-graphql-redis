const books = require('../../data/books.json');
const helpers = require('../../helpers/core');
module.exports = {
  Query: {
    books: () => books,
    book: async (parent, args, context) => {
      const combinedArgs = { parent, args, body: context.body };
      const argsStr = JSON.stringify(combinedArgs);
      const objHash = helpers.getHash(argsStr);
      const cacheKey = `${context.req.sessionID}:book:${helpers.getHash(
        JSON.stringify(combinedArgs)
      )}`;
      return await getOrAdd(cacheKey, () => {
        //Fetch daata database
        console.log('fetched from db');
        const res = books.find(b => b.id === +args.id);
        return res;
      });
    }
  }
};
