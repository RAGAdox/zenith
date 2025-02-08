export interface IToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface ISpotifyImage {
  url: string;
  width: number;
  height: number;
}
interface ISpotifyTrackDetails {
  name: string;
  popularity?: number;
  images: ISpotifyImage[];
  uri: string;
  artist: string;
}
