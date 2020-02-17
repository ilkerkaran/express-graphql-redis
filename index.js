const express = require('express');
const redis = require('./helpers/redisManager');
const helper = require('./helpers/core');
// const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers/resolvers.js');

const app = express();
app.use(bodyParser.json());
const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

app.use('/graphql', async (req, res, next) => {
  const nonHashedKey = JSON.stringify(req.body);
  const requestBodyHash = helper.getHash(JSON.stringify(nonHashedKey));
  const cachedData = await redis.get(requestBodyHash);
  if (cachedData) return res.send(JSON.parse(cachedData));
  next();

  var oldWrite = res.write,
    oldEnd = res.end;

  var chunks = [];

  res.write = function(chunk) {
    chunks.push(new Buffer(chunk));

    oldWrite.apply(res, arguments);
  };

  res.end = function(chunk) {
    if (chunk) chunks.push(new Buffer(chunk));

    var body = Buffer.concat(chunks).toString('utf8');
    redis.set(requestBodyHash, body);

    oldEnd.apply(res, arguments);
  };
});

server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
