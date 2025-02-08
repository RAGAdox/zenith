import { Client } from "@upstash/qstash";
let qStashClient: Client;
export default function getQStashClient() {
  if (qStashClient) {
    return qStashClient;
  }

  qStashClient = new Client({
    token: process.env.UPSTASH_QSTASH_TOKEN || "",
  });
  return qStashClient;
}
