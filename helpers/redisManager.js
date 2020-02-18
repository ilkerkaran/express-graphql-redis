const redis = require('redis');
const { Promise } = require('bluebird');

Promise.promisifyAll(redis.RedisClient.prototype);

const { promisify } = require('util');
const client = redis.createClient();
client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function(err) {
  console.log('Something went wrong ' + err);
});

const set = (key, value) => {
  client.set(key, value, redis.print);
};

const getAsync = promisify(client.get).bind(client);

const get = key => {
  console.log('get key', key);
  return getAsync(key);
};

getOrAdd = async (key, getFromDb) => {
  let resStr = await get(key);
  let resObj;
  if (resStr) {
    resObj = JSON.parse(resStr);
    return resObj;
  } else {
    resObj = getFromDb();
    resStr = JSON.stringify(resObj);
    set(key, resStr);
  }
  return resObj;
};

module.exports = { instance: client, set, get };
