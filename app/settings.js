var settings;
getSettings();

if (settings) document.documentElement.style.setProperty("--accent", settings.accentColor);

var saveAccent = false;

function getSettings() {
  settings = JSON.parse(localStorage.getItem("iqplayer-settings"));

  // TODO: Why does it need to be parsed two times?

  // if (!settings) settings = {
  //     accentColor: "#75DD82",
  //     alignMode: true
  // };
}

function saveSettings() {
  localStorage.setItem("iqplayer-settings", JSON.stringify(settings));
}

function checkbox(el) {
  switch (el.id) {
    case "save-accent":
      {
        saveAccent = el.checked;
        document.getElementById("save-accent-preview").innerText = saveAccent;
      }
      break;

    default:
      break;
  }
}

function getAccent() {
  if (saveAccent) {
    getSettings();
    return settings.accentColor;
  } else return settings.accentColor;
}

function colorScanner() {
  var input = document.getElementById("color");
  input.addEventListener("input", function () {
    getSettings();

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
