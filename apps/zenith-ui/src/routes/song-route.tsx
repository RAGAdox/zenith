import { Loader } from "../components/Loader";
import { SongComponent } from "../components/SongComponent";
import store from "../store";

const SongRoute = () => {
  const currentSong = store["CURRENT_SONG"]().resourceValue;
  return currentSong ? (
    <SongComponent spotifyTrackDetails={currentSong} variant="small" />
  ) : (
    <Loader />
  );
};

export default SongRoute;
