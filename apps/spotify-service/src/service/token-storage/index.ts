import { IToken } from "../../../types";
import getSpotifyCollection from "../getSpotifyCollection";

export async function storeAccessToken(token: IToken) {
  const spotifyCollection = await getSpotifyCollection();
  if (!spotifyCollection) {
    throw new Error("Failed to get Spotify collection");
  }
  try {
    await spotifyCollection.deleteMany({});
    await spotifyCollection.insertOne(token);
  } catch (error) {
    console.error("Error storing access token:", error);
  }
}

export async function retriveAccessToken(): Promise<IToken | null> {
  const spotifyCollection = await getSpotifyCollection();
  if (!spotifyCollection) {
    throw new Error("Failed to get Spotify collection");
  }
  try {
    const token = await spotifyCollection.findOne({});
    if (token && token.expiresAt > Date.now()) {
      return token;
    } else {
      console.error("Token not found or expired");
      await purgeAccessToken();
    }
  } catch (error) {
    console.error("Error retriving access token:", error);
  }
  return null;
}

export async function purgeAccessToken() {
  const spotifyCollection = await getSpotifyCollection();
  if (!spotifyCollection) {
    throw new Error("Failed to get Spotify collection");
  }
  try {
    await spotifyCollection.deleteMany({});
  } catch (error) {
    console.error("Error purging access token:", error);
  }
}
