import Ably from "ably";

export default function getAblyClient(userId?: string) {
  const ablyClient = new Ably.Realtime({
    key: process.env.ABLY_API_KEY,
    clientId: userId || "backend",
    echoMessages: false,
  });
  // ablyClient = new Ably.Realtime(process.env.ABLY_API_KEY!);
  return ablyClient;
}
