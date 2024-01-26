var player = document.getElementById("player");

player.onended = function() {
    playAudio(nextItem());
}

function playAudio(index) {

    player.src = playlist[index].url;
    playerState("play");

}

function timeLapse(percent) {

    player.currentTime = player.duration * percent / 100;
}

function refreshPlayer() {

    if (player.src) player.src = "";

}

function playerState(mode) {

    var playButton = document.getElementById("play");
    
    switch (mode) {
        case "play":
            playButton.setAttribute("src", "images/pause.png");
            player.play();
            break;
        case "stop":
            playButton.setAttribute("src", "images/play.png");
            player.pause();
            break;
        default: // "switch"
            if (!player.paused) {
                playButton.setAttribute("src", "images/play.png");
                player.pause();
            } else {
                playButton.setAttribute("src", "images/pause.png");
                player.play();
            }
            break;
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