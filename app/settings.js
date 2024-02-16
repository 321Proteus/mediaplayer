// Initialize and download settings at the beginning of the session

var settings; getSettings();


if (settings) document.documentElement.style.setProperty("--accent", settings.accentColor);

var saveAccent = false;

function getSettings() {
  settings = JSON.parse(localStorage.getItem("iqplayer-settings"));
}

function saveSettings() {
  localStorage.setItem("iqplayer-settings", JSON.stringify(settings));
}

function checkbox(el) {
  switch (el.id) {
    case "save-accent": {
        saveAccent = el.checked;
        document.getElementById("save-accent-preview").innerText = saveAccent;
      }
      break;
    
      case "text-overlap": {
        settings.textOverlap = el.checked;
        var preview = document.getElementById("text-overlap-preview");

        if (el.checked) {
          preview.innerHTML = "";
          preview.style.fontSize = "24px";
          createScrollingText(preview, "Scrolling text");
          document.querySelectorAll(".scroll-text").forEach(item => {
            item.style.animation = "scroll 2s linear infinite";
          })
          preview.childNodes[0].style.width = "120px";
        } else {
          preview.innerHTML = "Shrinking text";
          preview.style.fontSize = "12px";
        }
      }

    default:
      break;
  }

  saveSettings();
}

function getAccent() {
  if (saveAccent) {
    return settings.accentColor;
  } else return settings.accentColor;
}

function colorScanner() {
  var input = document.getElementById("color");
  input.addEventListener("input", function () {

    var text = this.value.toUpperCase();
    if (!text.startsWith("#")) text = "#" + text;

    const regex = new RegExp("([A-F0-9]{6}|[A-F0-9]{3})$");

    if (!regex.test(text)) {
      document.documentElement.style.setProperty(
        "--accent",
        settings.accentColor
      );
      document.getElementById("accent-color-preview").innerText =
        "Invalid Hex colour";
    } else {
      document.documentElement.style.setProperty("--accent", text);
      document.getElementById("accent-color-preview").innerText = text;
      settings.accentColor = text;
      if (saveAccent) saveSettings();
    }
  });
}
