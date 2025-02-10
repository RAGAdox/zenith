export interface ISpotifyImage {
  url: string;
  width: number;
  height: number;
}
export interface ISpotifyTrackDetails {
  name: string;
  popularity?: number;
  images: ISpotifyImage[];
  uri: string;
  artist: string;
}
