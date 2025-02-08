import { Receiver } from "@upstash/qstash";

export default async function verifyQStashAPI(request: Request) {
  const receiver = new Receiver({
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY || "",
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || "",
  });
  const signature = request.headers.get("Upstash-Signature");
  const body = await request.text();

  if (signature) {
    const isValid = await receiver.verify({
      signature,
      body,
    });
    return isValid;
  }
  return false;
}
