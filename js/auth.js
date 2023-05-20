function handleDiscordAuth() {
    var authorizationUrl = 'https://discord.com/api/oauth2/authorize?client_id=1105905851371368488&redirect_uri=https%3A%2F%2Fnkpl.ru%2F&response_type=code&scope=identify';
    window.open(authorizationUrl, '_blank');
}


function handleAuthorizationResponse() {
    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('code')) {
        var authorizationCode = urlParams.get('code');
        var tokenExchangeUrl = 'https://discord.com/api/v10/oauth2/token';

        var params = new URLSearchParams();
        params.append('client_id', 'ID_твоего_приложения');
        params.append('client_secret', 'Секретный_ключ_твоего_приложения');
        params.append('grant_type', 'authorization_code');
        params.append('code', authorizationCode);
        params.append('redirect_uri', 'URL-адрес_перенаправления_после_авторизации');

        fetch(tokenExchangeUrl, {
            method: 'POST',
            body: params
        })
            .then(response => response.json())
            .then(data => {
                var accessToken = data.access_token;

                var userInfoUrl = 'https://discord.com/api/v10/users/@me';

                fetch(userInfoUrl, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
                    .then(response => response.json())
                    .then(userInfo => {
                        var username = userInfo.username;
                        var discriminator = userInfo.discriminator;

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

// Вызываем функцию обработки ответа после авторизации
handleAuthorizationResponse();
