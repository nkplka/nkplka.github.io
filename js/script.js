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
