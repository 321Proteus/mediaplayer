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

// Drag and Drop system controls

function dragAndDrop() {

    const container = document.getElementById("playlist");

    let draggedItem = null;
    let placeholder = null;
    let swapItem = null;
    
    var arr = [];
    
    
    function calculate() {
    
      var list = document.getElementById("playlist").children;
      for (let i=0;i<list.length;i++) {
        arr[i] = parseInt(list[i].getAttribute("o")) + 1;
      }
      console.log(arr)
    }
    
    
    container.addEventListener("dragstart", e => {
    
        draggedItem = e.target.closest(".playlist-item");

        placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        placeholder.innerHTML += "<div class='playlist-thumbnail'></div>"

        container.insertBefore(placeholder, draggedItem);
    
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", null);
        placeholder.style.display = "flex";
    });
    
    container.addEventListener("dragover", e => {
        console.log(e)        
        e.preventDefault();
    
        if (draggedItem === null) return;
  
        draggedItem.style.display = "none";
        const boundingBox = e.target.getBoundingClientRect();
        const mouseY = e.clientY;
      
        const isAbove = mouseY < boundingBox.top + boundingBox.height / 2;
        
        var parent = e.target.closest(".playlist-item")
        if (parent.parentNode != document.body) {
          if (isAbove) {
            container.insertBefore(placeholder, parent);
          } else {
            container.insertBefore(placeholder, parent.nextSibling);
          }    
        }  
    });
    
    container.addEventListener("dragend", () => {
    
        draggedItem.style.display = "flex";
      
        if (draggedItem !== null) {
          if (placeholder && placeholder.parentNode == container)
            container.removeChild(placeholder);
      
          draggedItem = null;
          placeholder = null;
        }
    });
    
    container.addEventListener("drop", e => {
    
        e.preventDefault();
        if (placeholder !== null) {
          container.replaceChild(draggedItem, placeholder);
        }  
    });
}
