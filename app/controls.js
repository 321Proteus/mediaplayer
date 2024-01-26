var playerButtons = document.querySelectorAll("#player-button")

function handleButton(id) {

	var event = new CustomEvent("playerbtnclick", { detail: { id: id } });

	window.dispatchEvent(event);

}

window.addEventListener("playerbtnclick", function(data) {

	// alert("Pressed button: " + id);

	switch (data.detail.id) {
		case "play":
      playerState("switch");
		break;
      case "prev":
		default:
		break;
		// TODO: add logic for playlist, thus the back and next buttons
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
    
    playAudio(0)
    displayMetadata(playlist[playlistIndex]);

});

