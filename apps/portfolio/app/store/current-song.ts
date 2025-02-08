import { create } from "zustand";
interface I_CURRENT_SONG {
  resourceValue: ISpotifyTrackDetails | undefined;
  errorCode: string | undefined;
  setResourceValue: (song: ISpotifyTrackDetails | undefined) => void;
  setErrorCode: (error: string | undefined) => void;
}

const CURRENT_SONG = create<I_CURRENT_SONG>((set) => ({
  resourceValue: undefined,
  errorCode: undefined,
  setResourceValue: (song: ISpotifyTrackDetails | undefined) =>
    set({ resourceValue: song, errorCode: undefined }),
  setErrorCode: (error: string | undefined) =>
    set({ errorCode: error, resourceValue: undefined }),
}));

export default CURRENT_SONG;
