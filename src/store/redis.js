const redis = require('redis');
const {redis_url} = require('../../config');
const client = redis.createClient({
  url: redis_url,
});

(async () => {
  console.log("🚀 ~ redis URL:", redis_url);
  try {
    await client.connect();
    console.log("🚀 ~ REDIS CLIENT STARTED");
  } catch (error) {
    console.log("🚀 ~ REDIS CLIENT FAILED:", error);
  }
})();

module.exports = client;