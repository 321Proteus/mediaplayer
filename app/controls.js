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
	// alert("Wcisnieto przycisk " + id);

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

document.getElementById("progress-slider").oninput = function() {

	var value = this.value;
	// Math.floor(Math.random()*16777215).toString(16);
	document.documentElement.style.setProperty("--color", `linear-gradient(to right, #75DD82 0%, #75DD82 ${value}%, gray ${value}%, gray 100%)`);

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
      console.log('Nazwa pliku:', files[i].name);
      console.log('Typ pliku:', files[i].type);
      console.log('Rozmiar pliku:', files[i].size, 'bajtów');
    }
	metadata(files[0]);
	playAudio(files[0]);
	
});

