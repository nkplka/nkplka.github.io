var titles = [
"//////////////////",
"/////////////////n",
"////////////////nk",
"///////////////nkp",
"//////////////nkpl",
"/////////////nkpl.",
"////////////nkpl.r",
"///////////nkpl.ru",
"//////////nkpl.ru/",
"/////////nkpl.ru//",
"////////nkpl.ru///",
"///////nkpl.ru////",
"//////nkpl.ru/////",
"/////nkpl.ru//////",
"////nkpl.ru///////",
"///nkpl.ru////////",
"//nkpl.ru/////////",
"/nkpl.ru//////////",
"nkpl.ru///////////",
"kpl.ru////////////",
"pl.ru/////////////",
"l.ru//////////////",
".ru///////////////",
"ru////////////////",
"u/////////////////",];

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
