import { getStations, getSongsForStation } from "./api.js";
import { getStreamFromPls } from "./pls.js";

async function init() {
  try {
    const stations = await getStations();
    console.log(`fetched ${stations.length} stations!`);
    console.debug(stations);

    stations.forEach(station => {
      let button = document.createElement("button");

      let image = new Image();
      image.src = station.image;
      button.appendChild(image);

      button.innerHTML = button.innerHTML + "<br/>" + station.title;
      button.className = "button";
      button.onclick = async () => {
        console.log(await getStreamFromPls(station.playlistUrl));

        const songs = await getSongsForStation(station.id);
        console.log(`fetched ${songs.length} songs!`);
        console.debug(songs);
      };
      document.querySelector(".stations").appendChild(button);
      
    });
  } catch (error) {
    console.error(error.message);
  }
}
window.onload = init();
