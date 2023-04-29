const redis = require('redis');
const {redis_url} = require('../../config');
const client = redis.createClient({
  url: redis_url,
});

(async () => {
  await client.connect();
  console.log("🚀 ~ REDIS CLIENT STARTED");
})();

module.exports = client;