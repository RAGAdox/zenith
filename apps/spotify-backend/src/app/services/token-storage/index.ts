import { getRedisClient } from "@/app/clients";
import { throwHttpErrors } from "@/app/utils";
import { IToken } from "@zenith/types";

export async function purgeAccessToken() {
  const redisClient = getRedisClient();
  await redisClient.del("token");
}

export async function storeAccessToken(token: IToken) {
  const redisClient = getRedisClient();
  await redisClient.hset("token", {
    ...token,
    expiresAt: token.expiresAt.toString(),
  });
}

export async function retriveAccessToken(): Promise<IToken | undefined> {
  const redisClient = getRedisClient();
  const tokenStored = await redisClient.hgetall("token");
  if (tokenStored) {
    const token: IToken = {
      accessToken: tokenStored.accessToken as string,
      refreshToken: tokenStored.refreshToken as string,
      expiresAt: parseInt(tokenStored.expiresAt as string),
    };
    if (
      token.accessToken &&
      token.refreshToken &&
      token.expiresAt > Date.now()
    ) {
      return token;
    }
  }
  throwHttpErrors("NO_TOKEN");
}
