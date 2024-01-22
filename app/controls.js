var playerButtons = document.querySelectorAll("#player-button")
console.log(playerButtons)

for(const button of playerButtons) 
	
	button.addEventListener("mouseover", (e) => {

		console.log(button, e);
	})

function handleButton(sender, id) {

	var event = new CustomEvent("playerbtnclick", { detail: {sender: sender, id : id} });

	window.dispatchEvent(event);

}

window.addEventListener("playerbtnclick", function(data) {

	el = data.detail.sender;
	id = data.detail.id;
	// alert("Wciśnięto przycisk " + id);

	if (id == "play") {
		if (el.getAttribute("src") == "images/play.png") el.setAttribute("src", "images/pause.png");
		else el.setAttribute("src", "images/play.png");
	}
});

document.getElementById("progress-slider").oninput = function() {

	var value = this.value;
	// Math.floor(Math.random()*16777215).toString(16);
	document.documentElement.style.setProperty("--color", `linear-gradient(to right, #75DD82 0%, #75DD82 ${value}%, gray ${value}%, gray 100%)`);

};