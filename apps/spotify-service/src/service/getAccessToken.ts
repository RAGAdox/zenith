import { IToken } from "../../types";

export async function getAccessToken(code: string) {
  if (code) {
    const tokenUrl = "https://accounts.spotify.com/api/token";

    const urlParams = new URLSearchParams();
    urlParams.append("grant_type", "authorization_code");
    urlParams.append("code", code);
    urlParams.append("redirect_uri", "https://localhost:3000/callback");
    urlParams.append("client_id", process.env.SPOTIFY_CLIENT_ID || "");
    urlParams.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET || "");

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlParams.toString(),
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const token: IToken = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: Date.now() + data.expires_in * 1000,
      };
      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  }
}
