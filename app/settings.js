function checkbox(el) {

    if (el.checked == true) {
        console.log("checked")
    }
    else {
        console.log("unchecked");
    }
}

function colorScanner() {
    var input = document.getElementById("color");
    input.addEventListener("input", function() {

        var text = this.value.toUpperCase();
        if (!text.startsWith("#")) text = "#" + text;        

        const regex = new RegExp("([A-F0-9]{6}|[A-F0-9]{3})$")

        if (!regex.test(text)) {
            document.documentElement.style.setProperty("--accent", "#75DD82");
            document.getElementById("color-info").innerText = "Invalid Hex colour";
        }
        else {
            document.documentElement.style.setProperty("--accent", text);
            document.getElementById("color-info").innerText = text;
        }

    })    
}

