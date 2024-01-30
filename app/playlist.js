var playlist = [];
var playlistIndex = 0;

var loopState = 0; // 0 - no loop, 1 - loop playlist, 2 - loop single song

var alignMode = true; // Should new items be added to the front or back of the playlist?

function addToPlaylist(item) {

    if (alignMode == true)
        playlist.push(item);
    else
        playlist = playlist.concat(item);
}

function removeFromPlaylist(index) {
    playlist.splice(index, 1);
}

player.onended = nextItem();

function nextItem() {

    if (!playlist.length) { console.error("Playlist is empty"); return; };

    console.log(loopState)

    var passCondition = playlistIndex < playlist.length - 1;

    switch (loopState) {
        case 0: if (passCondition) playlistIndex++;
                else playlistIndex = playlist.length - 1;
        break;
        case 1: if (passCondition) playlistIndex++;
                else playlistIndex = 0;
        break;
        case 2: playlistIndex = playlistIndex;
    }

    displayMetadata(playlist[playlistIndex])
    playAudio(playlistIndex);   

}

function previousItem() {
    if (!playlist.length) { console.error("Playlist is empty"); return; }

    if (playlistIndex - 1 > 0) playlistIndex--;
    else playlistIndex = 0;

    displayMetadata(playlist[playlistIndex])
    playAudio(playlistIndex);   
    
}

function startPlaylist() {
    player.setAttribute("initialized", true);
    playAudio(0);
    displayMetadata(playlist[0]);
}

function shuffle() {
    for (let i = playlist.length-1; i>0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }
}

function swapItems(i, j) {
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
}
  