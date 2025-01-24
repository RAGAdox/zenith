import { Context } from "@netlify/functions";
import { getCurrentlyPlaying } from "../service/getCurrentlyPlaying";
import { retriveAccessToken } from "../service/token-storage";

export default async (request: Request, context: Context) => {
  const token = await retriveAccessToken();
  if (!token) {
    return new Response(null, {
      status: 303,
      headers: { Location: process.env.FUNCTION_BASE_URL + "/authorization" },
    });
  }
  const data = await getCurrentlyPlaying(token.accessToken);

  if (data) {
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" },
    });
  }
  return new Response("No songs are being played");
};
