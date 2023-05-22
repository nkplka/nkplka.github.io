window.addEventListener('load', function() {
    var accessToken = window.location.hash.match(/access_token=([^&]+)/);
    if (accessToken) {
        accessToken = accessToken[1];

        fetch('https://discord.com/api/v10/users/@me', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(response => response.json())
            .then(data => {
                var username = data.username;
                var discriminator = data.discriminator;

                // Сохраняем данные в куки
                document.cookie = "username=" + username + "; path=/";
                document.cookie = "discriminator=" + discriminator + "; path=/";
                document.cookie = "accessToken=" + accessToken + "; path=/";
            });
    }
});

// Обработчик клика по кнопке
document.getElementById('showNotification').addEventListener('click', function() {
    // Проверяем наличие данных в куках
    var username = getCookie('username');
    var discriminator = getCookie('discriminator');
    var accessToken = getCookie('accessToken');

    if (username && discriminator && accessToken) {
        // Выводим окно с уведомлением
        var notification = document.createElement('div');
        notification.textContent = 'Пользователь: ' + username + '#' + discriminator;
        notification.style.width = '100px';
        notification.style.height = '50px';
        notification.style.backgroundColor = 'lightblue';
        notification.style.position = 'fixed';
        notification.style.top = '10px';
        notification.style.left = '10px';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        document.body.appendChild(notification);
    }
});

// Функция для получения значения из куки по имени
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
}
