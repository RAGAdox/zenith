import { Context } from "@netlify/functions";
import { getAccessToken } from "../service/getAccessToken";
import { storeAccessToken } from "../service/token-storage";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("No Code found", { status: 400 });
  }

  const token = await getAccessToken(code);

  if (!token) {
    return new Response("Failed to get access token", { status: 500 });
  }
  await storeAccessToken(token);
  return new Response(null, {
    status: 307,
    headers: { Location: process.env.FUNCTION_BASE_URL + "/song" },
  });
};
