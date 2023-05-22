var titles = [
    "//////////////////",
    "/////////////////4",
    "////////////////40",
    "///////////////404",
    "//////////////404/",
    "/////////////404//",
    "////////////404///",
    "///////////404////",
    "//////////404/////",
    "/////////404//////",
    "////////404///////",
    "///////404////////",
    "//////404/////////",
    "/////404//////////",
    "////404///////////",
    "///404////////////",
    "//404/////////////",
    "/404//////////////",
    "404///////////////",
    "04////////////////",
    "4/////////////////",
    "//////////////////"];

var currentIndex = 0;
var isCustomTitleSet = false;
var customTitle = "";

function changePageTitle() {
    if (isCustomTitleSet) {
        document.title = customTitle;
    } else {
        document.title = titles[currentIndex];
        currentIndex = (currentIndex + 1) % titles.length;
    }
}

function changeCustomTitle() {
    var customTitleInput = document.getElementById("title-input");
    customTitle = customTitleInput.value;
    isCustomTitleSet = !!customTitle;
}

setInterval(changePageTitle, 75);
