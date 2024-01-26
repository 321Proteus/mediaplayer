var playlist = [];
var playlistIndex = 0;

var playMode = 1;

function addToPlaylist(item) {
    playlist.push(item);
}

function removeFromPlaylist(index) {
    playlist.splice(index, 1);
}

player.onended = function() {

    if (playMode == 0) removeFromPlaylist(playlistIndex)
    playlistIndex++;
    displayMetadata(playlist[playlistIndex])
    playAudio(playlistIndex);

}

function nextItem() {
    return (playlistIndex + 1 < playlist.length) ? playlistIndex+1 : -1;
}


function previousItem() {
    return (playlistIndex - 1 >= 0) ? playlistIndex-1 : 0;
}