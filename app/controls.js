var playerButtons = document.querySelectorAll("#player-button")
console.log(playerButtons)

function handleButton(id) {

	var event = new CustomEvent("playerbtnclick", { detail: { id: id } });

	window.dispatchEvent(event);

}

window.addEventListener("playerbtnclick", function(data) {

	// alert("Pressed button: " + id);

	switch (data.detail.id) {
		case "play":
      switchPlayState();
		break;
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

document.body.addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.body.addEventListener('dragleave', function() {
});

document.body.addEventListener('drop', function(event) {
	event.preventDefault();

	var files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      console.log('File name:', files[i].name);
      console.log('File type:', files[i].type);
      console.log('File size:', files[i].size, 'bytes');
    }

	loadMetadata(files[0])
	.then(data => {

			document.getElementById("title-overlay").innerText = data.title;
			document.getElementById("author-overlay").innerText = data.artist;
			getCover(data.picture.data, data.picture.format)

	})
  .catch(err => {

      console.log("Error:", err.info);
      document.getElementById("title-overlay").innerText = err.title.split('.')[0];
      document.getElementById("author-overlay").innerText = err.artist;

  });
  refreshPlayer();
	playAudio(files[0]);

});

