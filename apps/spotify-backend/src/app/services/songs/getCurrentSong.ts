import { throwHttpErrors } from "@/app/utils";
import { ISpotifyTrackDetails } from "@zenith/types";

export default async function getCurrentSong(accessToken: string) {
  const BASE_URL = "https://api.spotify.com/v1/me/player/currently-playing";

  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 204) {
    return;
  }
  if (!response.ok) {
    throwHttpErrors("INTERNAL_ERROR");
  }
  const data = await response.json();
  if (data && data.item) {
    const responseData: ISpotifyTrackDetails = {
      name: data.item.name,
      images: data.item.album.images,
      uri: data.item.uri,
      popularity: data.item.popularity,
      artist: data.item.album.artists
        .map(({ name }: { name: string }) => name)
        .join(","),
    };
    return responseData;
  }
  throwHttpErrors("INTERNAL_ERROR");
}
