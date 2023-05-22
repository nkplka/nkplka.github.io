window.addEventListener('load', function() {
    var usernameElement = document.getElementById('username');
    var discriminatorElement = document.getElementById('discriminator');

    var username = getCookie('username');
    var discriminator = getCookie('discriminator');

    usernameElement.textContent = username || 'undefined';
    discriminatorElement.textContent = '#' + discriminator || '#undefined';
});

function getCookie(name) {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var cookieName = cookie.split('=')[0];

        if (cookieName === name) {
            return cookie.split('=')[1];
        }
    }

    return null;
}
