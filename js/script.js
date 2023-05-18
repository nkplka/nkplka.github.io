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


var captionLength = 0;
var caption = '';

$(document).ready(function() {
    setInterval('cursorAnimation()', 600);
    captionEl = $('#caption');

    $('#test-typing').click(function() {
        testTypingEffect();
    });

    $('#test-erasing').click(function() {
        testErasingEffect();
    });
});

function testTypingEffect() {
    caption = $('input#user-caption').val();
    type();
}

function type() {
    captionEl.html(caption.substr(0, captionLength++));
    if (captionLength < caption.length + 1) {
        setTimeout('type()', 50);
    } else {
        captionLength = 0;
        caption = '';
    }
}

function testErasingEffect() {
    caption = captionEl.html();
    captionLength = caption.length;
    if (captionLength > 0) {
        erase();
    } else {
        $('#caption').html("You didn't write anything to erase, but that's ok!");
        setTimeout('testErasingEffect()', 1000);
    }
}

function erase() {
    captionEl.html(caption.substr(0, captionLength--));
    if (captionLength >= 0) {
        setTimeout('erase()', 50);
    } else {
        captionLength = 0;
        caption = '';
    }
}

function cursorAnimation() {
    $('#cursor').animate({
        opacity: 0
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
}