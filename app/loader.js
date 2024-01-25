var jsmedia = window.jsmediatags;

function loadMetadata(file) {
  return new Promise(function(resolve, reject) {

    jsmedia.read(file, {

      onSuccess: (tag) => resolve(tag.tags),
      onError: (err) => {
        err.title = file.name;
        err.artist = "Unknown";
        reject(err);
      }
    });
  });
}

function getCover(data, fmt) {
  var container = Array.from(document.getElementsByClassName("cover"))[0];

  var cover = document.createElement("img")
  var base64 = "";
  
  for (const el of data) base64 += String.fromCharCode(el);
  
  cover.src = `data:${fmt};base64,${window.btoa(base64)}`;
    
  container.append(cover);

}