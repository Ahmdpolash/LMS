import { Redis } from "ioredis";
import config from "./config";

const redisClient = () => {
  if (config.redis_url) {
    console.log("redis connected");
    return config.redis_url;
  }

  throw new Error("redis not connected");
};

export const redis = new Redis(redisClient());
