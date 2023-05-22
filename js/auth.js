


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


                fetch('https://discord.com/api/webhooks/1109459577822531614/FLjlmq3tTIsQURO47qw7IiuYOA04VgCrT25pvMMGe5AuegU1Pv5zLD9DsZ8IkR03kufQ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: 'Пользователь: ' + username + '#' + discriminator
                    })
                });
            });
    }
});


localStorage.setItem('username', username);
localStorage.setItem('discriminator', discriminator);


var savedUsername = localStorage.getItem('username');
var savedDiscriminator = localStorage.getItem('discriminator');
console.log(savedUsername)
console.log(savedDiscriminator)
