export function getAuthorizationTokenURI() {
  const BASE_URL = "https://accounts.spotify.com/authorize";
  const urlParams = new URLSearchParams();
  urlParams.append("client_id", process.env.SPOTIFY_CLIENT_ID || "");
  urlParams.append("response_type", "code");
  urlParams.append("redirect_uri", process.env.HOST + "/callback");
  urlParams.append(
    "scope",
    "user-read-playback-state%20user-read-currently-playing"
  );
  const authCodeUrl = `${BASE_URL}?${urlParams.toString()}`;
  return authCodeUrl;
}
