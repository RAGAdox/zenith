export { default as isValidSpotifyURL } from "./isValidSpotifyURL";

const BACKEND_API = `${import.meta.env.VITE_HOST_API_PROTOCOL}://${
  import.meta.env.VITE_HOST_API
}`;

export { BACKEND_API };
