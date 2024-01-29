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
      playAudio(playlistIndex);
      displayMetadata(playlist[playlistIndex]);
    break;

    case "next":
      playlistIndex = nextItem();
      playAudio(playlistIndex);
      displayMetadata(playlist[playlistIndex]);
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

function displayMetadata(songData) {

  document.getElementById("title-overlay").innerText = songData.title;
  document.getElementById("author-overlay").innerText = songData.artist;
  if (songData.picture)
    document.getElementById("cover").innerHTML = songData.picture;
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

      var songData = await generateSongData(f);

      addToPlaylist(songData);

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

  document.getElementById("modal-exit").onclick = function() {
    overlay.style.animation = "none";
    overlay.style.display = "none";
    container.innerHTML = "";
  }


}

