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
    let expires = "";
    const date = new Date();
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
        document.getElementById('message-username').textContent = usernameCookie + '#' + tag;
    }

    document.getElementById('nickname').addEventListener('click', function () {
        document.querySelector('.popup').classList.toggle('show');
        input.focus();
    });
});

$(function() {

    var inputMessage = $('#inputMessage');
    var chatMessages = $('#chatMessages');

    inputMessage.keypress(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            var message = inputMessage.val();

            inputMessage.val('');
            if (message.trim() !== '') {
                var messageHtml = '<div class="message">' +
                    '<div class="message-info">' +
                    '<span id="message-username">' + name + '#' + tag + ' ' + '</span>' +
                    '<span id="message-timestamp">' + getFormattedTime() + '</span>' +
                    '</div>' +
                    '<div id="message-text">' + message + '</div>' +
                    '</div>';
                chatMessages.append(messageHtml);
                // Добавляем сообщение в файл messages.js
                var newMessage = {
                    username: name,
                    tag: tag,
                    time: getFormattedTime(),
                    text: message
                };
                messages.push(newMessage);
                var jsonString = JSON.stringify(messages);
                $.ajax({
                    type: "POST",
                    url: "save_messages.php",
                    data: {data: jsonString},
                    success: function () {
                        console.log("Messages saved successfully");
                    },
                    error: function () {
                        console.log("Error saving messages");
                    }
                });

            }
        }
    });

// Загружаем сообщения из messages.js при загрузке страницы
    $.getJSON('./js/messages.js', function(data) {
        messages = data;
        messages.forEach(function(message) {
            var messageHtml = '<div class="message">' +
                '<div class="message-info">' +
                '<span id="message-username">' + message.username + '#' + message.tag + ' ' + '</span>' +
                '<span id="message-timestamp">' + message.time + '</span>' +
                '</div>' +
                '<div id="message-text">' + message.text + '</div>' +
                '</div>';
            chatMessages.append(messageHtml);
            addMessage(message);
        });
    });

});
    // Получение времени в формате "hh:mm"
    function getFormattedTime() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return hours + ':' + minutes;
    }

// Загрузка сообщений при загрузке страницы
window.onload = function() {
    var messages = getMessages();
    // Отобразить сообщения на странице
    messages.forEach(function(message) {
        // Добавить сообщение в DOM
    });
};
