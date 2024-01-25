function playAudio(file) {
    player = document.createElement("audio");

    player.setAttribute("ontimeupdate", "getSongTime(this)");
    player.id = "player";

    var url = URL.createObjectURL(file);
    player.src = url;

    document.body.appendChild(player);
    switchPlayState()
}

function refreshPlayer() {
    var player = document.getElementById("player");

    if (player) player.remove();
}

function switchPlayState() {
    var playButton = document.getElementById("play");
    var player = document.getElementById("player");
    if (!player.paused) {
        playButton.setAttribute("src", "images/play.png");
        player.pause();
    } else {
        playButton.setAttribute("src", "images/pause.png");
        player.play();
    }
}

function formatTime(s) {
    var h = Math.floor(s / 3600);
    var m = Math.floor((s - 3600 * h) / 60);
    var _s = Math.floor(s - 3600 * h - 60 * m);

    if (m < 10) m = '0' + m;
    if (_s < 10) _s = '0' + _s;
    return  h + ':' + m + ':' + _s;
}

function getSongTime(player) {

    var current = Math.floor(player.currentTime).toString();
    var duration = Math.floor(player.duration).toString();

    document.getElementById("song-time").innerHTML = formatTime(current);
    document.getElementById("song-duration").innerHTML = formatTime(duration);

    var slider = document.getElementById("progress-slider");
    slider.value = current;
    slider.max = duration;

    var valuePercent = current/duration * 100;
    transformSlider(valuePercent);

}