function metadata(file) {

    const reader = new FileReader();

    reader.onload = function(e) {
        var arrayBuffer = e.target.result;

        var tags = parse(arrayBuffer);

        document.getElementById("title-overlay").innerHTML = tags.title + " " + tags.artist;
    }

    reader.readAsArrayBuffer(file)
}

function playAudio(file) {
    player = document.createElement("audio");

    player.setAttribute("ontimeupdate", "getSongTime(this)");
    player.id = "player";

    var url = URL.createObjectURL(file);
    player.src = url;

    document.body.appendChild(player);

    console.log(player);
}

// Format the time from "s" to "hh:mm:ss"
function formatTime(s) {
    var h = Math.floor(s / 3600);
    var m = Math.floor((s - 3600 * h) / 60);
    var _s = Math.floor(s - 3600 * h - 60 * m);

    if (m < 10) m = '0' + m;
    if (_s < 10) _s = '0' + _s;
    return  h + ':' + m + ':' + _s;
}

function getSongTime(player) {

    // The container to display song time
    var container = document.getElementById("author-overlay");

    // Get the song duration and current time from the player
    var current = Math.floor(player.currentTime).toString();
    var duration = Math.floor(player.duration).toString();

    // Print out formatted time

    container.innerHTML = formatTime(current) + '/' + formatTime(duration);

}