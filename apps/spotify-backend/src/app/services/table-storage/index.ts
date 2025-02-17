import { getRedisClient } from "@/app/clients";
import { throwHttpErrors } from "@/app/utils";

const getUserIndex = (userId: string): string => {
  return `user:${userId}:table`;
};
async function createTable(tableId: string, userId: string) {
  const client = getRedisClient();
  await client.hset("table", { [tableId]: [userId] });
  await client.sadd(getUserIndex(userId), tableId);
}

async function updateTable(
  tableId: string,
  existingUsersIds: string[],
  newUserId: string
) {
  const client = getRedisClient();
  await client.hset("table", { [tableId]: [...existingUsersIds, newUserId] });
  await client.sadd(getUserIndex(newUserId), tableId);
}

async function getUserIdsByTableId(tableId: string): Promise<string[] | null> {
  const client = getRedisClient();
  const existingUsers = (await client.hget("table", tableId)) as
    | string[]
    | null;
  return existingUsers ? existingUsers : null;
}

async function getTableIdByUserId(userId: string): Promise<string | null> {
  const client = getRedisClient();
  const tableIds = await client.smembers(getUserIndex(userId));
  if (tableIds.length === 1) {
    return tableIds[0];
  }
  return null;
}

/* These functions are actually accessed */
export async function reserveTable({
  tableId,
  userId,
}: {
  tableId: string;
  userId: string;
}) {
  const existingUserTableId = await getTableIdByUserId(userId);
  console.log("existingUserTableId===>", existingUserTableId);
  if (existingUserTableId) {
    throwHttpErrors("BAD_REQUEST");
  }
  const existingUsers = await getUserIdsByTableId(tableId);
  if (existingUsers) {
    await updateTable(tableId, existingUsers, userId);
  } else {
    await createTable(tableId, userId);
  }
}

export async function retriveTableId(userId: string) {
  return await getTableIdByUserId(userId);
}
