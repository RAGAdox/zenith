import { getQStashClient } from "@/app/clients";
import { PublishRequest } from "@upstash/qstash";

export default async function scheduleMessage({
  url = `${process.env.FUNCTION_BASE_URL}`,
  method = "GET",
  delay = "45m",
}: PublishRequest<BodyInit>) {
  const client = getQStashClient();

  const response = await client.publish({
    url,
    method,
    delay,
  });
  return response;
}
