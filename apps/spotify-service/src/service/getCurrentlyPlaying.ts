export async function getCurrentlyPlaying(accessToken: string) {
  const BASE_URL = "https://api.spotify.com/v1/me/player/currently-playing";
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 204) {
      console.log("No Songs are being played currently");
      return;
    }
    if (!response.ok) {
      throw new Error(`Fetching current playing failed ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current song:", error);
  }
}
