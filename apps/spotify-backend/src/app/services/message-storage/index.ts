import { getRedisClient } from "@/app/clients";

export async function storeScheduleMessage(messageId: string, url: string) {
  const redisClient = getRedisClient();
  await redisClient.hset(url, { url, messageId });
  await redisClient.expire(url, 45 * 60);
}

export async function retriveScheduledMessage(url: string) {
  const redisClient = getRedisClient();
  const message = await redisClient.hgetall(url);
  return message;
}

export async function purgeScheduleMessage(url: string) {
  const redisClient = getRedisClient();
  await redisClient.del(url);
}
