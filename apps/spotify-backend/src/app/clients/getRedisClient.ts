import { Redis } from "@upstash/redis";
let redisClient: Redis;
export default function getRedisClient(): Redis {
  if (redisClient) {
    return redisClient;
  }
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REDIS_TOKEN,
  });
  return redisClient;
}
