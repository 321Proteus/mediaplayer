var playerButtons = document.querySelectorAll("#player-button")
console.log(playerButtons)

for (const button of playerButtons) 
	
	button.addEventListener("mouseover", (e) => {

	//	console.log(button, e);

})

function handleButton(sender, id) {

	var event = new CustomEvent("playerbtnclick", { detail: {sender: sender, id : id} });

	window.dispatchEvent(event);

}

window.addEventListener("playerbtnclick", function(data) {

	el = data.detail.sender;
	id = data.detail.id;
	// alert("Pressed button: " + id);

	if (id == "play") {

		var player = document.getElementById("player");

		if (!player.paused) {
			el.setAttribute("src", "images/play.png");
			player.pause();
		} else {
			el.setAttribute("src", "images/pause.png");
			player.play();
		}
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

	playAudio(files[0]);

  var meta = loadMetadata(files[0])
  .then((data) => {
    
    document.getElementById("title-overlay").innerText = data.title;
    document.getElementById("author-overlay").innerText = data.artist;
    getCover(data.picture.data, data.picture.format)

  });

  playAudio(files[0]);
});


