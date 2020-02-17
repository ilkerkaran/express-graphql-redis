const redis = require('redis');

const client = redis.createClient();
client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function(err) {
  console.log('Something went wrong ' + err);
});

const set = (key, value) => {
  client.set(key, value);
};

const get = key => {
  console.log('get key', key);
  client.get(key, function(error, result) {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log('GET result ->' + result);
    return result;
  });
};

getOrAdd = (key, callback) => {
  let res = get(key);
  if (!res) {
    const res = callback();
    res.cached = true;
    set(key, persistedResult);
  }
  return res;
};

module.exports = { instance: client, set, get };
