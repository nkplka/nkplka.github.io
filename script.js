$(document).ready(function () {
    var $nickname = $('.nickname');
    var $popup = $('#popup');

    $nickname.on('click', function (e) {
        $popup.toggle();
        e.stopPropagation();
    });

    $popup.on('click', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', function () {
        $popup.hide();
    });

});
function getUserCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function generateToken() {

    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));

    return token;
}
function generateTag() {

    var tag = "";
    var possible = "0123456789";

    for (var i = 0; i < 4; i++)
        tag += possible.charAt(Math.floor(Math.random() * possible.length));

    return tag;
}
function setUserCookie(name, value) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // Куки будут жить год
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

var token = getUserCookie('token');
var tag = getUserCookie('tag');

if (!token || !tag) {

    token = generateToken();
    tag = generateTag();
    setUserCookie('token', token);
    setUserCookie('tag', tag);

}
document.addEventListener('DOMContentLoaded', function () {

    const input = document.querySelector('.popup input');
    const button = document.getElementById('save-button');

    button.addEventListener('click', function () {
        document.cookie = `username=${input.value}`;
        document.getElementById('nickname').textContent = input.value + '#' + tag;
        document.querySelector('.popup').classList.remove('show');
    });

    const usernameCookie = getUserCookie('username');
    const tag = getUserCookie('tag');

    if (usernameCookie) {
        document.getElementById('nickname').textContent = usernameCookie + '#' + tag;
    }

    document.getElementById('nickname').addEventListener('click', function () {
        document.querySelector('.popup').classList.toggle('show');
        input.focus();
    });
});

$(document).ready(function () {
    var $input = $('.chat-input input');
    var $chatMessages = $('#chatMessages');

    function addMessage(username, message) {
        var date = new Date();
        var hours = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        var timestamp = hours + ':' + minutes;

        var $message = $('<div>').addClass('message');
        var $messageInfo = $('<div>').addClass('message-info');
        var $messageUsername = $('<span>').addClass('message-username').text(username);
        var $messageTimestamp = $('<span>').addClass('message-timestamp').text(timestamp);
        var $messageText = $('<div>').addClass('message-text').text(message);

        $messageInfo.append($messageUsername).append($messageTimestamp);
        $message.append($messageInfo).append($messageText);
        $chatMessages.append($message);

        $chatMessages.scrollTop($chatMessages.prop('scrollHeight'));
    }

    $input.on('keydown', function (e) {
        if (e.which === 13) {
            var message = $input.val().trim();

            if (message) {
                addMessage($('#nickname').text(), message);
                $input.val('');
            }
        }
    });


    var savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.forEach(function (message) {
        addMessage(message.username, message.text);
    });


    $(window).on('beforeunload', function () {
        var messages = $('.message').get().map(function (message) {
            return {
                username: $(message).find('.message-username').text(),
                text: $(message).find('.message-text').text()
            };
        });

        localStorage.setItem('messages', JSON.stringify(messages));
    });
});
