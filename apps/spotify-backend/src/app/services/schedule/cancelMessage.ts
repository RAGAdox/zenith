import { getQStashClient } from "@/app/clients";

export default async function cancelMessage(messageId: string) {
  const client = getQStashClient();
  await client.messages.delete(messageId);
}
