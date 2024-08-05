// Initialize and download settings at the beginning of the session

var settings; getSettings();


if (settings) document.documentElement.style.setProperty("--accent", settings["accent-color"]);

function getSettings() {

  settings = JSON.parse(localStorage.getItem("iqplayer-settings"));
  console.log(settings)
  if (!settings) {
    settings = {};

    settings["accent-color"] = "#75DD82";
    settings["save-accent"] = true;
    settings["text-overlap"] = false;
    settings["align-mode"] = true;
    settings["playback-speed"] = 1.0;
    settings["playback-volume"] = 0.8;

    saveSettings();

  }

}

function displayPreview(setting) {
  var el = document.getElementById(setting)
  var preview = document.getElementById(setting + "-preview");

  switch (setting) {

    case "accent-color": {
      preview.innerText = settings[setting];
    }

    case "save-accent": {
      preview.innerText = settings[setting];
    }
    break;
    
    case "text-overlap": {

      if (el.checked == true) {
        preview.innerHTML = "";
        createScrollingText(preview, "Scrolling text");
        document.querySelectorAll(".scroll-text").forEach(item => {
          item.style.animation = "scroll 2s linear infinite";
        })
        var scrollContainer = preview.childNodes[0];

        scrollContainer.style.width = "80px";
        scrollContainer.style.fontSize = "12px";
        scrollContainer.style.color = "gray";

      } else {
        preview.innerHTML = "Shrinking text";
        preview.style.fontSize = "8px";
      }
    }
    break;

    case "align-mode": {
      preview.innerText = (el.checked) ? "end" : "begin";
    }
    break;

    case "playback-speed": {
      el.value = settings[setting];
      adjustPlaybackSpeed();
    }
    break;

    case "playback-volume": {
      preview.innerText = settings[setting] * 100 + '%';
    }
    break;

    default: {
      preview.innerText = el.value;
    }
    break;
  }
}

function displaySettings() {
  for (const item in settings) {
    var settingElement = document.getElementById(item)

    if (settingElement.type == "checkbox") {
      settingElement.checked = settings[item];
      displayPreview(item); 
    }

    else {
      settingElement.value = settings[item];
      displayPreview(item);
    }

  }
}

function saveSettings() {
  localStorage.setItem("iqplayer-settings", JSON.stringify(settings));
}

function checkbox(el) {

  settings[el.id] = el.checked;
  displayPreview(el.id);

  saveSettings();

}

function colorScanner() {
  var text = this.value.toUpperCase();
  if (!text.startsWith("#")) text = "#" + text;

  const regex = new RegExp("([A-F0-9]{6}|[A-F0-9]{3})$");

  if (!regex.test(text)) {
    document.getElementById("accent-color-preview").innerText =
      "Invalid Hex colour";
  } else {
    document.documentElement.style.setProperty("--accent", text);
    document.getElementById("accent-color-preview").innerText = text;
    settings["accent-color"] = text;
    if (settings["save-accent"]) saveSettings();
  }
}

function testScanner() {
  var text = this.value;
  displayPreview("test-textbox");
}

function mapValueToProcent(a, min, max) {
  var x = ((a - min) / (max - min)) * 100;
  return x;
}

function initTextbox() {
  var inputCollection = document.querySelectorAll(".textbox");

  inputCollection.forEach(input => {

    var scannerFunction = undefined;

    switch (input.id) {
        case "accent-color": scannerFunction = colorScanner; break;
        case "test-textbox": scannerFunction = testScanner; break;
        default: break;
    }

    input.addEventListener("input", scannerFunction)
  });
}

function initSliders() {
  var speedSlider = document.getElementById("playback-speed");
  speedSlider.addEventListener("input", adjustPlaybackSpeed);

  var gainSlider = document.getElementById("playback-volume");
  gainSlider.addEventListener("input", adjustGain);
}

function adjustGain() {
  var gainSlider = document.getElementById("playback-volume");
  var value;
  if (gainSlider) value = gainSlider.value;
  else value = settings["playback-volume"];

  volumeNode.gain.value = value;
  settings["playback-volume"] = value;
  saveSettings();

  if (gainSlider) {
    document.getElementById("playback-volume-preview").innerText = Math.round(gainSlider.value * 100) + '%';
    transformSlider(gainSlider);
  }
}

function adjustPlaybackSpeed() {
  var slider = document.getElementById("playback-speed");
  var value;
  if (slider) value = slider.value;
  else value = settings["playback-speed"];

  player.playbackRate = value;
  settings["playback-speed"] = value;
  saveSettings();

  if (slider) {
    document.getElementById("playback-speed-preview").innerText = value + "x";
    transformSlider(slider);
  }

}
