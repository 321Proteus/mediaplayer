function loadMetadata(file) {
  return new Promise(function(resolve, reject) {

    window.jsmediatags.read(file, {

      onSuccess: (tag) => resolve(tag.tags),
      onError: (err) => reject(err)
    });
  });
}

function getCover(data, fmt) {

  var base64 = "";
  
  for (const el of data) base64 += String.fromCharCode(el);
  var cover = `data:${fmt};base64,${window.btoa(base64)}`;
    
  return `<img id="cover-image" src=${cover}>`;

}

async function generateSongData(file) {

  var url = URL.createObjectURL(file);

  var songData = {};

  songData.url = url;

  try {
    var data = await loadMetadata(file);
    
    songData.title = data.title;
    songData.artist = data.artist;
    songData.picture = getCover(data.picture.data, data.picture.format);

  } catch (err) {

    songData.title = file.name.split('.')[0];
    songData.artist = "Unknown";
    songData.picture = null;
  }

  return songData;
}