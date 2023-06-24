import redis from 'redis';
import {CONFIG} from '../config';

const redisClient = redis.createClient({
  url: CONFIG.redis_url,
});

(async () => {
  console.log("🚀 ~ redis URL:", CONFIG.redis_url);
  try {
    await redisClient.connect();
    console.log("🚀 ~ REDIS CLIENT STARTED");
  } catch (error) {
    console.log("🚀 ~ REDIS CLIENT FAILED:", error);
  }
})();

export {redisClient};
