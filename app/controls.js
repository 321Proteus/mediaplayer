var playerButtons = document.querySelectorAll("#player-button")

function handleButton(id) {

	var event = new CustomEvent("playerbtnclick", { detail: { id: id } });

	window.dispatchEvent(event);

}

window.addEventListener("playerbtnclick", function(data) {

	// alert("Pressed button: " + id);

	switch (data.detail.id) {
		case "play":
      if (player.src)
        playerState("switch");
		break;

    case "prev":
      playlistIndex = previousItem();
      if (typeof playlistIndex != "object") {
        playAudio(playlistIndex);
        displayMetadata(playlist[playlistIndex]);        
      }

    break;

    case "next":
      playlistIndex = nextItem();
      if (typeof playlistIndex != "object") {
        playAudio(playlistIndex);
        displayMetadata(playlist[playlistIndex]);        
      }
    break;

    case "list":
      modal("playlist");
    break;

		default:
		break;
		// TODO: add logic for shuffle
	}
});

function transformSlider(a) {
	document.documentElement.style.setProperty("--color", `linear-gradient(to right, #75DD82 0%, #75DD82 ${a}%, gray ${a}%, gray 100%)`);
}

document.getElementById("progress-slider").oninput = function() {

	var value = this.value;
	transformSlider(value)
	
	var player = document.getElementById("player");
	if (player) {
		player.currentTime = value;
	}
	
};

function displayPlaylist() {
  for (let i = 0; i < playlist.length; i++) {

    var container = document.getElementById("playlist");
    var item = document.createElement("div");

    var itemData = playlist[i];

    item.classList.add("playlist-item");
    container.append(item)    

    if (itemData.picture) item.innerHTML += itemData.picture;
    else {
      var fallbackImage = document.createElement("div");
      fallbackImage.classList.add("fallback-thumbnail");
      item.appendChild(fallbackImage);
    }

    var textData = document.createElement("div");
    textData.classList.add("playlist-text");



    textData.innerHTML += `<div class="playlist-title">${itemData.title}</div>`;
    textData.innerHTML += `<div class="playlist-artist">${itemData.artist}</div>`;

    item.appendChild(textData);
    item.childNodes[0].classList.add("playlist-thumbnail")
    console.log(item)

  }
}

function displayMetadata(songData) {

  document.getElementById("title-overlay").innerText = songData.title;
  document.getElementById("author-overlay").innerText = songData.artist;
  if (songData.picture) {
    var cover = document.getElementById("cover");
    cover.innerHTML = songData.picture;
    cover.childNodes[0].style.maxWidth = "100%";
  }

  else 
    document.getElementById("cover").innerHTML = "<div id='cover'></div>";
}

document.body.addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.body.addEventListener('dragleave', function() {
});

document.body.addEventListener('drop', async function(event) {
	event.preventDefault();

	var files = event.dataTransfer.files;


    for (let i = 0; i < files.length; i++) {
      var f = files[i];
      console.log(`${f.name} (${f.type}) ${f.size} B`);

      if (f.type.startsWith("audio")) {
      var songData = await generateSongData(f);

      addToPlaylist(songData);        
      }


    }

    console.log(playlist)
    
    if (!player.getAttribute("initialized"))
      startPlaylist();

});

async function modal(id) {

  var container = document.getElementById("modal-container")
  var overlay = document.getElementById("overlay")
  
  overlay.style.display = "flex";
  overlay.style.animation = "overlay 0.3s linear 1 forwards";
      
  var response = await fetch(`./modal/${id}.html`);
  var content = await response.text()
      
  container.innerHTML = content;

  displayPlaylist(2);

  document.getElementById("modal-exit").onclick = function() {
    overlay.style.animation = "none";
    overlay.style.display = "none";
    container.innerHTML = "";
  }


}

