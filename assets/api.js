/**
 * API endpoints for SomaFm
 */
const SomaFM = {
  channels: "https://somafm.com/channels.xml",
  songs: (id) => `https://somafm.com/songs/${id}.xml`,
};

/**
 * Fetch all stations and convert them from XML to JSON
 */
export async function getStations() {
  const xml = await fetch(SomaFM.channels).then((data) => data.text());

  const channels = new DOMParser()
    .parseFromString(xml, "text/xml")
    .getElementsByTagName("channel");

  return Array.from(channels)
    .map((channel) => {
      return {
        id: channel.id,
        title: channel.getElementsByTagName("title")[0].textContent,
        description: channel.getElementsByTagName("description")[0].textContent,
        genre: channel.getElementsByTagName("genre")[0].textContent,
        dj: channel.getElementsByTagName("dj")[0].textContent,

        // try to get the highest quality stream
        playlistUrl: (channel.getElementsByTagName("highestpls").length !== 0
          ? channel.getElementsByTagName("highestpls")[0]
          : channel.getElementsByTagName("fastpls")[0]
        ).textContent.replace("http", "https"),

        image: channel.getElementsByTagName("image")[0].textContent,
        lastPlaying: channel.getElementsByTagName("lastPlaying")[0].textContent,
        listeners: parseInt(
          channel.getElementsByTagName("listeners")[0].textContent
        ),
      };
    })
    .sort((a, b) => a.listeners < b.listeners);
}

/**
 * Fetch recently played songs for a given channel
 *
 * @param {string} id - The channel id
 */
export async function getSongsForStation(id) {
  const xml = await fetch(SomaFM.songs(id)).then((data) => data.text());

  const songs = new DOMParser()
    .parseFromString(xml, "text/xml")
    .getElementsByTagName("song");

  return Array.from(songs).map((song) => {
    return {
      title: song.getElementsByTagName("title")[0].textContent,
      artist: song.getElementsByTagName("artist")[0].textContent,
      album: song.getElementsByTagName("album")[0].textContent,
      date: new Date(
        parseInt(song.getElementsByTagName("date")[0].textContent) * 1000
      ),
    };
  });
}
