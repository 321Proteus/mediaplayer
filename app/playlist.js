var playlist = [];
var playlistIndex = 0;

var loopState = 0; // 0 - no loop, 1 - loop playlist, 2 - loop single song


function addToPlaylist(item) {
  // Align mode - Should new items be added to the front or back of the playlist?
  if (settings["align-mode"] == true) playlist.push(item);
  else playlist = [item].concat(playlist);
}

function removeFromPlaylist(index) {
  playlist.splice(index, 1);
}

player.onended = () => nextItem(false);

function nextItem(force) {

  if (!playlist.length) {
    console.error("Playlist is empty");
    return;
  }

  var passCondition = playlistIndex < playlist.length - 1;

  if (force) {
    // Force update playlist index and override looping
    if (passCondition) playlistIndex++;
    playAudio(playlistIndex);
    return;
  }  

  if (settings["autoplay"] == false) {
    playerState("pause");

  } else {

    switch (loopState) {
      case 0:
        playlistIndex++;
        break;
      case 1:
        if (passCondition) playlistIndex++;
        else playlistIndex = 0;
        break;
      case 2:
        playlistIndex = playlistIndex;
        break;
      default:
        break;
    }

    playAudio(playlistIndex);

  }


}

function previousItem() {
  if (!playlist.length) {
    console.error("Playlist is empty");
    return;
  }

  if (playlistIndex - 1 > 0) playlistIndex--;
  else playlistIndex = 0;

  playAudio(playlistIndex);
}

function startPlaylist() {
  player.setAttribute("initialized", true);
  playAudio(0);
}

function shuffle() {

  var arrangement = playlist.map((v, i) => i);

  if (playlist.length > 1) {

    for (let i = arrangement.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrangement[i], arrangement[j]] = [arrangement[j], arrangement[i]];
    }
  }

  rearrange(arrangement);

}

function rearrange(order) {

  if (!order) {

    order = [];
    var list = document.getElementById("playlist").children;

    for (let i = 0; i < list.length; i++) {
      order.push(parseInt(list[i].getAttribute("order")));
    }

  }

  playlist = order.map((i) => playlist[i]);
}

// Drag and Drop system controls

function dragAndDrop() {
  const container = document.getElementById("playlist");

  let draggedItem = null;
  let placeholder = null;

  container.addEventListener("dragstart", (e) => {
    draggedItem = e.target;

    placeholder = document.createElement("div");
    placeholder.classList.add("placeholder");
    // placeholder.innerHTML += "<div draggable='true' class='playlist-thumbnail'></div>"

    container.insertBefore(placeholder, draggedItem);

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", null);

    draggedItem.style.display = "flex";
  });

  container.addEventListener("dragover", (e) => {
    e.preventDefault();

    if (draggedItem === null) return;

    draggedItem.style.display = "none";
    const boundingBox = e.target.getBoundingClientRect();
    const mouseY = e.clientY;

    const isAbove = mouseY < boundingBox.top + boundingBox.height / 2;
    placeholder.innerHTML = "<div class='playlist-thumbnail'></div>";

    var parent = e.target.closest(".playlist-item");
    if (parent) {
      if (isAbove) container.insertBefore(placeholder, parent);
      else container.insertBefore(placeholder, parent.nextSibling);
    }
  });

  container.addEventListener("dragend", () => {
    draggedItem.style.display = "flex";

    if (draggedItem !== null) {
      if (placeholder && placeholder.parentNode == container)
        container.removeChild(placeholder);

      draggedItem = null;
      placeholder = null;
    }
  });

  container.addEventListener("drop", (e) => {
    e.preventDefault();
    if (placeholder !== null) {
      container.replaceChild(draggedItem, placeholder);
    }

    rearrange();
  });
}
