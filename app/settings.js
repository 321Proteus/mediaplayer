// Initialize and download settings at the beginning of the session

var settings; getSettings();


if (settings) document.documentElement.style.setProperty("--accent", settings["accent-color"]);

function getSettings() {
  settings = JSON.parse(localStorage.getItem("iqplayer-settings"));

  if (!settings) {
    settings = {};

    settings["accent-color"] = "#75DD82";
    settings["save-accent"] = true;
    settings["text-overlap"] = false;
    settings["align-mode"] = true;

    saveSettings();

  }

}

function displaySettings() {
  for (const item in settings) {
    var settingElement = document.getElementById(item)
    var previewElement = document.getElementById(item + "-preview");

    if (settingElement.type == "checkbox") {
      settingElement.checked = settings[item];
      previewElement.innerText = settings[item];      
    }

    else if (settingElement.type == "text") 
      settingElement.value = settings[item];

  }
}

function saveSettings() {
  localStorage.setItem("iqplayer-settings", JSON.stringify(settings));
}

function checkbox(el) {

  settings[el.id] = el.checked;
  var preview = document.getElementById(el.id + "-preview");

  console.log(preview)

  switch (el.id) {

    case "save-accent": {
        preview.innerText = settings[el.id];
      }
    break;
    
    case "text-overlap": {

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
    break;

    case "align-mode": {
      preview.innerText = (el.checked) ? "begin" : "end";
    }
    break;

    default:
      break;
  }
  displaySettings();
  saveSettings();

}

function colorScanner() {
  var input = document.getElementById("accent-color");
  input.addEventListener("input", function () {

    var text = this.value.toUpperCase();
    if (!text.startsWith("#")) text = "#" + text;

    const regex = new RegExp("([A-F0-9]{6}|[A-F0-9]{3})$");

    if (!regex.test(text)) {
      document.documentElement.style.setProperty(
        "--accent",
        settings["accent-color"]
      );
      document.getElementById("accent-color-preview").innerText =
        "Invalid Hex colour";
    } else {
      document.documentElement.style.setProperty("--accent", text);
      document.getElementById("accent-color-preview").innerText = text;
      settings["accent-color"] = text;
      if (settings["save-accent"]) saveSettings();
    }
  });
}
