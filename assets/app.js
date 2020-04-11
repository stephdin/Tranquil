import { getStations, getSongsForStation } from "./api.js";
import { getStreamFromPls } from "./pls.js";

console.log("tranquil - a SomaFM player");
console.log("https://github.com/stephdin/tranquil-lite");

window.onload = async function init() {
  try {
    const stations = await getStations();
    console.log(`fetched ${stations.length} stations!`);
    console.debug(stations);

    stations.forEach((station) => {
      document.querySelector(".stations").appendChild(
        new Button({
          title: station.title,
          description: station.description,
          listeners: station.listeners,
          onClick: async () => {
            console.log(await getStreamFromPls(station.playlistUrl));
            const songs = await getSongsForStation(station.id);
            console.log(`fetched ${songs.length} songs!`);
            console.debug(songs);
          },
        })
      );
    });
  } catch (error) {
    console.error(error.message);
  }
};

function Button({ title, description, listeners, onClick }) {
  let button = document.createElement("div");
  button.className = "button";
  button.innerHTML = `<div>${title}</div> <div>${description}</div> <div>${listeners} listeners</div>`;
  button.onclick = onClick;
  return button;
}
