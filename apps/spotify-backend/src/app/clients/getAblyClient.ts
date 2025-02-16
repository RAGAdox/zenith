import Ably, { Realtime } from "ably";

let ablyClient: Realtime;
export default function getAblyClient() {
  if (ablyClient) {
    return ablyClient;
  }
  ablyClient = new Ably.Realtime({
    key: process.env.ABLY_API_KEY,
    clientId: "backend",
  });
  // ablyClient = new Ably.Realtime(process.env.ABLY_API_KEY!);
  return ablyClient;
}
