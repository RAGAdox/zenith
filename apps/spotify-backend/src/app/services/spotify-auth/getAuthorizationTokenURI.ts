export default function getAuthorizationTokenURI(referer?: string) {
  const BASE_URL = "https://accounts.spotify.com/authorize";
  const urlParams = new URLSearchParams();
  urlParams.append("client_id", process.env.SPOTIFY_CLIENT_ID || "");
  urlParams.append("response_type", "code");
  urlParams.append("redirect_uri", process.env.FUNCTION_BASE_URL + "/callback");
  urlParams.append(
    "scope",
    "user-read-playback-state%20user-read-currently-playing"
  );
  if (referer) {
    urlParams.append("state", referer);
  }
  const authCodeUrl = `${BASE_URL}?${urlParams.toString()}`;
  return authCodeUrl;
}
