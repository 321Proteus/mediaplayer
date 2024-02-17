var playerButtons = document.querySelectorAll("#player-button");

function handleButton(id) {
  var event = new CustomEvent("playerbtnclick", { detail: { id: id } });

  window.dispatchEvent(event);
}

window.addEventListener("playerbtnclick", (data) => {
  // alert("Pressed button: " + id);

  switch (data.detail.id) {
    case "play":
      if (player.src) playerState("switch");
      break;

    case "prev":
      previousItem();
      break;

    case "next":
      nextItem(true); // Override loops
      break;

    case "list":
      modal("playlist");
      break;

    case "loop":
      var loopButton = document.getElementById("loop");
      loopState = ++loopState % 3;

      switch (loopState) {
        case 0:
          loopButton.src = "images/noloop.png";
          break;
        case 1:
          loopButton.src = "images/loop.png";
          break;
        case 2:
          loopButton.src = "images/loopone.png";
          break;
      }
      break;

    case "shuffle":
      shuffle();
      displayPlaylist(true); // Ignore Drag and Drop events
      break;

    case "settings":
      modal("settings");
      break;

    default:
      break;
  }
});

function transformSlider(object) {
  var a = object.value;
  var min = (object.min) ? object.min : 0;
  var max = (object.max) ? object.max : 100;
  var x = mapValueToProcent(a, min, max);
  object.style.setProperty(
    "--color",
    `linear-gradient(to right, var(--accent) 0%, var(--accent) ${x}%, gray ${x}%, gray 100%)`
  );
}

function fitText(el, maxWidth) {
  var width = parseInt(el.clientWidth);
  var size = parseInt(
    window.getComputedStyle(el).getPropertyValue("font-size")
  );

  if (width > maxWidth) {
    while (width > maxWidth && size > 5) {
      size--;
      el.style.fontSize = size + "px";
      width = parseInt(el.clientWidth);
    }
  } else {
    while (width < maxWidth && size < 30) {
      size++;
      el.style.fontSize = size + "px";
      width = parseInt(el.clientWidth);
    }
  }
}

function calculateTextWidth(text, size) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  ctx.font = size + " Comic Sans MS";
  var width = Math.ceil(ctx.measureText(text).width);

  return width;
}

function createScrollingText(el, text) {

  var textBegin = text.slice(0, text.length/3);
  var textMiddle = text.slice(text.length/3, text.length*2/3);
  var textEnd = text.slice(text.length*2/3, text.length);
  console.log(`'${textBegin}' '${textMiddle}' '${textEnd}'`);

  var scrollContainer = document.createElement("div");
  scrollContainer.className = "scroll-container";
  el.appendChild(scrollContainer);

  var firstText = document.createElement("div");
  firstText.className = "scroll-text";
  scrollContainer.appendChild(firstText);

  var uniqueClass = "scroll-text-" + Math.random().toString(36).substring(2, 9);

  var firstTextItem = document.createElement("span");
  firstTextItem.className = uniqueClass;
  firstText.appendChild(firstTextItem);

  var scrollStyle = document.createElement("style");
  scrollStyle.innerText = `
    .${uniqueClass}:before { content: "${textBegin}" }
    .${uniqueClass}:after { content: "${textEnd}" }`;
  firstTextItem.appendChild(scrollStyle);
  
  var firstTextContent = document.createElement("span");
  firstTextContent.innerText = textMiddle;
  firstTextItem.appendChild(firstTextContent);

  var secondText = document.createElement("div");
  secondText.className = "scroll-text";
  scrollContainer.appendChild(secondText);

  var secondTextItem = document.createElement("span");
  secondTextItem.className = uniqueClass;
  secondText.appendChild(secondTextItem);

  secondTextContent = document.createElement("span");
  secondTextContent.innerText = textMiddle;
  secondTextItem.appendChild(secondTextContent);
}

document.getElementById("progress-slider").oninput = function () {
  var value = this.value;
  transformSlider(this);

  var player = document.getElementById("player");
  if (player) {
    player.currentTime = value;
  }
};

function displayPlaylist(eventMode) {
  var container = document.getElementById("playlist");
  container.innerHTML = "";

  for (let i = 0; i < playlist.length; i++) {
    var item = document.createElement("div");
    item.setAttribute("order", i);
    item.setAttribute("draggable", true);

    var itemData = playlist[i];

    item.classList.add("playlist-item");
    container.append(item);

    if (itemData.picture) item.innerHTML += itemData.picture;
    else {
      var fallbackImage = document.createElement("div");
      fallbackImage.classList.add("fallback-thumbnail");
      item.appendChild(fallbackImage);
    }

    var textData = document.createElement("div");
    textData.classList.add("playlist-text");
    textData.setAttribute("ondragover", "return false");

    textData.innerHTML += `<div class="playlist-title">${itemData.title}</div>`;
    textData.innerHTML += `<div class="playlist-artist">${itemData.artist}</div>`;

    item.appendChild(textData);
    item.childNodes[0].classList.add("playlist-thumbnail");

    var title = textData.childNodes[0];

    if (settings.textOverlap == true) {

      if (title.clientWidth > parseInt(textData.clientWidth)) {
        title.style.display = "none";
        createScrollingText(textData, itemData.title);
        var scrollContainer = textData.childNodes[2];
        var artistContainer = textData.childNodes[0];
  
        textData.insertBefore(scrollContainer, artistContainer)
        textData.insertBefore(artistContainer, scrollContainer.nextSibling);
      }  
    } else {
      fitText(textData.childNodes[0], parseInt(textData.clientWidth) * 0.9);
      fitText(textData.childNodes[1], parseInt(textData.clientWidth) * 0.9);      
    }




  }

  if (!eventMode) dragAndDrop();
}

function displayMetadata(songData) {
  if (songData) {
    document.getElementById("title-overlay").innerText = songData.title;
    document.getElementById("author-overlay").innerText = songData.artist;

    if (songData.picture) {
      var cover = document.getElementById("cover");
      cover.innerHTML = songData.picture;
      cover.childNodes[0].style.maxWidth = "100%";
      cover.childNodes[0].style.filter = "brightness(0.66)";
    }
  } else {
    // Playlist end metadata (return to default)
    document.getElementById("title-overlay").innerText = "Song Title";
    document.getElementById("author-overlay").innerText = "Artitst Title";
    document.getElementById("cover").innerHTML = "<div id='cover'></div>";

    document.getElementById("song-time").innerHTML = "-:--";
    document.getElementById("song-duration").innerHTML = "-:--";
  }
}

document.body.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.body.addEventListener("dragleave", () => {});

document.body.addEventListener("drop", async (e) => {
  e.preventDefault();

  var files = e.dataTransfer.files;

  for (let i = 0; i < files.length; i++) {
    var f = files[i];
    console.log(`${f.name} (${f.type}) ${f.size} B`);

    if (f.type.startsWith("audio")) {
      var songData = await generateSongData(f);

      if (document.getElementById("overlay").style.display == "flex") {
        modal("playlist");
      }

      addToPlaylist(songData);
    }
  }

  console.log(playlist);

  if (!player.getAttribute("initialized")) startPlaylist();
});

async function modal(id) {
  var container = document.getElementById("modal-container");
  var overlay = document.getElementById("overlay");

  overlay.style.display = "flex";
  overlay.style.animation = "overlay 0.3s linear 1 forwards";

  var response = await fetch(`./modal/${id}.html`);
  var content = await response.text();

  container.innerHTML = content;

  if (id == "playlist") displayPlaylist();
  else {
    displaySettings();
    initSlider();
    colorScanner();
  }
  document.getElementById("close").onclick = function () {
    overlay.style.animation = "none";
    overlay.style.display = "none";
    container.innerHTML = "";
  };
}
