function openTab(tabName) {
    var i, tabs;
    tabs = document.getElementsByClassName("tab");

    for (i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
}

function changeTheme(cssPath) {
    var stylesheet = document.getElementById("themeStylesheet");
    if (stylesheet) {
        stylesheet.href = cssPath;
    } else {
        stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = cssPath;
        stylesheet.id = "themeStylesheet";
        document.head.appendChild(stylesheet);
    }


    localStorage.setItem("selectedTheme", cssPath);
}

window.onload = function() {
    var selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme) {
        changeTheme(selectedTheme);
        openTab('Main');
    }
}

function serverstat() {
    const addr = "https://api.mcsrvstat.us/2/mc.nkpl.ru";
    fetch(addr)
        .then(response => response.json())
        .then(json => {
            const minecraftDiv = document.getElementById("Minecraft");

            if (json.online === false) {
                minecraftDiv.innerHTML = "<p>Server: " + json.hostname + "</p><p>Offline</p>";
            } else {
                minecraftDiv.innerHTML = "<p>Server: " + json.hostname + "</p><p>online: " + json.players.online + "/" + json.players.max + "</p>";
            }
        });
}

var allowedIP = '85.192.19.167';

function checkIP() {

    $.getJSON('https://api.ipify.org?format=json', function(data) {
        var visitorIP = data.ip;

        if (visitorIP === allowedIP) {

            $('#adm').show();
            $('#admin-panel').show();
            console.log("allow")

        } else {

            $('#adm').hide();
            $('#admin-panel').hide();
            console.log("deny")
        }
    });
}


checkIP();


