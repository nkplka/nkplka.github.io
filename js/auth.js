window.addEventListener('load', function() {

    let accessToken = window.location.hash.match(/access_token=([^&]+)/);
    if (accessToken) {
        accessToken = accessToken[1];


        fetch('https://discord.com/api/v10/users/@me', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(response => response.json())
            .then(data => {

                let username = data.username;
                let discriminator = data.discriminator;

                document.cookie = "username=" + username + "; path=/";
                document.cookie = "discriminator=" + discriminator + "; path=/";

                fetch('https://discord.com/api/webhooks/1109459577822531614/FLjlmq3tTIsQURO47qw7IiuYOA04VgCrT25pvMMGe5AuegU1Pv5zLD9DsZ8IkR03kufQ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: 'New auth: ' + username + '#' + discriminator
                    })
                });
            });
    }
});





