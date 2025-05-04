// import { Redis } from "ioredis";
// import config from "./config";

// const redisClient = () => {
//   if (config.redis_url) {
//     console.log("redis connected");
//     return config.redis_url;
//   }

//   throw new Error("redis not connected");
// };

// export const redis = new Redis(redisClient());

import { Redis } from "ioredis";
import config from "./config";

if (!config.redis_url) {
  throw new Error("❌ Missing Redis URL in config");
}

const redis = new Redis(config.redis_url);

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export default redis;
