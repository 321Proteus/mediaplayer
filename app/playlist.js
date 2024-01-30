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

player.onended = () => {

    console.log(loopState)

    if (loopState != 2) {

        if (playlistIndex < playlist.length) {
            playlistIndex++;
    
        }
        else {

            if (loopState == 1) playlistIndex = 0;

        }
    }

    displayMetadata(playlist[playlistIndex])
    playAudio(playlistIndex);   

}

function nextItem() {
    if (!playlist.length) return new Error;
    return (playlistIndex + 1 < playlist.length) ? playlistIndex+1 : playlist.length - 1;
}


function previousItem() {
    if (!playlist.length) return new Error;
    return (playlistIndex - 1 > 0) ? playlistIndex-1 : 0;
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
  