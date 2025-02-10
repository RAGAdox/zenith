import { throwHttpErrors } from "@/app/utils";
import { IToken } from "@zenith/types";

export default async function refreshAccessToken(token: IToken) {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const authHeader = btoa(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  );

  const urlParams = new URLSearchParams();
  urlParams.append("grant_type", "refresh_token");
  urlParams.append("refresh_token", token.refreshToken);
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authHeader}`,
    },
    body: urlParams.toString(),
  });
  if (!response.ok) {
    throwHttpErrors("INTERNAL_ERROR");
  }
  const data = await response.json();
  const newToken: IToken = {
    accessToken: data.access_token,
    refreshToken: token.refreshToken,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return newToken;
}
