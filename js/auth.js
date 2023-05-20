function handleDiscordAuth() {
    var authorizationUrl = 'https://discord.com/api/oauth2/authorize?client_id=1105905851371368488&redirect_uri=https%3A%2F%2Fnkpl.ru%2F&response_type=code&scope=identify';
    window.open(authorizationUrl, '_blank');
}


function handleAuthorizationResponse() {
    // Получаем URL-параметры из текущего URL
    var urlParams = new URLSearchParams(window.location.search);

    // Проверяем, есть ли в URL-параметрах код авторизации
    if (urlParams.has('code')) {
        // Отправляем запрос на обмен кода авторизации на токен доступа
        var authorizationCode = urlParams.get('code');
        var tokenExchangeUrl = 'https://discord.com/api/v10/oauth2/token';

        var params = new URLSearchParams();
        params.append('client_id', '1105905851371368488');
        params.append('client_secret', 'rtCzvS3cga_Vpnt5dfrDFlj5do0O-v-S');
        params.append('grant_type', 'authorization_code');
        params.append('code', authorizationCode);
        params.append('redirect_uri', 'https://nkpl.ru');

        fetch(tokenExchangeUrl, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then(data => {
                // Получаем токен доступа из ответа
                var accessToken = data.access_token;

                // Отправляем запрос для получения информации о пользователе
                var userInfoUrl = 'https://discord.com/api/v10/users/@me';

                fetch(userInfoUrl, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
                    .then(response => response.json())
                    .then(userInfo => {
                        // Извлекаем никнейм и тег пользователя
                        var username = userInfo.username;
                        var discriminator = userInfo.discriminator;

                        // Выводим никнейм и тег в консоль
                        console.log('Никнейм пользователя: ' + username);
                        console.log('Тег пользователя: ' + discriminator);
                    })
                    .catch(error => {
                        console.error('Ошибка получения информации о пользователе:', error);
                    });
            })
            .catch(error => {
                console.error('Ошибка обмена кода авторизации на токен доступа:', error);
            });
    }
}


handleAuthorizationResponse();
