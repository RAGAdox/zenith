import { Collection } from "mongodb";
import { IToken } from "../../types";
import { getMoongooseClient } from "./getMongooseClient";

let spotifyCollection: Collection<IToken> | null = null;
export default async function getSpotifyCollection() {
  if (spotifyCollection) {
    return spotifyCollection;
  }
  const db = await getMoongooseClient();
  if (!db) {
    return;
  }
  const collection = db.collection("spotify") as Collection<IToken>;
  spotifyCollection = collection;
  return collection;
}
