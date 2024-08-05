const audioCtx = new AudioContext();

const player = document.getElementById("player");
const trackNode = audioCtx.createMediaElementSource(player);
const volumeNode = audioCtx.createGain();

trackNode.connect(volumeNode).connect(audioCtx.destination);

function playAudio(index) {
  player.src = playlist[index].url;
  player.currentTime = 0;

  displayMetadata(playlist[index]);

  fitText(
    document.getElementById("title-overlay"),
    parseInt(document.body.clientWidth) / 2
  );
  fitText(
    document.getElementById("author-overlay"),
    parseInt(document.body.clientWidth) / 2
  );
  playerState("play");
}

function timeLapse(percent) {
  player.currentTime = (player.duration * percent) / 100;
}

function playerState(mode) {
  var playButton = document.getElementById("play");

  if (mode == "play" || (mode == "switch" && player.paused)) {
    playButton.src = "images/pause.png";
    player.play();
  } else {
    playButton.src = "images/play.png";
    player.pause();
  }
}

function formatTime(s) {
  var h = Math.floor(s / 3600);
  var m = Math.floor((s - 3600 * h) / 60);
  var _s = Math.floor(s - 3600 * h - 60 * m);

  if (m < 10) m = "0" + m;
  if (_s < 10) _s = "0" + _s;
  return h + ":" + m + ":" + _s;
}

function getSongTime(player) {
  var current = Math.floor(player.currentTime).toString();
  var duration = Math.floor(player.duration).toString();

  document.getElementById("song-time").innerHTML = formatTime(current);
  document.getElementById("song-duration").innerHTML = formatTime(duration);

  var slider = document.getElementById("progress-slider");
  slider.value = current;
  slider.max = duration;

  var valuePercent = (current / duration) * 100;
  transformSlider(slider);
}
