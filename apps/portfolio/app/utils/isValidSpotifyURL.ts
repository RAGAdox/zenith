export default function isValidSpotifyURL(url: string) {
  if (url && url !== "") {
    const spotifyTrackRegex =
      /^https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)(\?.*)?$/;
    const match = url.match(spotifyTrackRegex);
    if (match) {
      const trackId = match[1];
      return { isValid: true, trackId };
    }
  }
  return { isValid: false };
}
