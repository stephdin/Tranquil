/**
 * Fetches the pls playlist and returns the mp3 stream url
 *
 * @param {string} playlistUrl - The url for the pls playlist
 */
export async function getStreamFromPls(playlistUrl) {
  const pls = await fetch(playlistUrl).then(data => data.text());
  return pls;
}
