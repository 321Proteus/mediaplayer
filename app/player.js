function playAudio(file) {
    player = document.createElement("audio");

    player.setAttribute("ontimeupdate", "getSongTime(this)");
    player.id = "player";

    var url = URL.createObjectURL(file);
    player.src = url;

    document.body.appendChild(player);

    console.log(player);
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

    var container = document.getElementById("author-overlay");

    var current = Math.floor(player.currentTime).toString();
    var duration = Math.floor(player.duration).toString();

    container.innerHTML = formatTime(current) + '/' + formatTime(duration);

}