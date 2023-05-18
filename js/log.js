function sendWebhookMessage(ip, browser, device, location) {
    const webhookUrl = 'https://discord.com/api/webhooks/1104855216899248332/7m3WHRCwidYcFWIHwYwcSKOVQUsdkQsk8vduVL1AUfSnfO1AjNN8SZ84vNzhB_ACT4cq';

    const message = {
        content: null,
        embeds: [
            {
                description: `IP: ${ip} | Location: ${location}\n Browser: ${browser}\nDevice: ${device}`,
                color: null,
                author: {
                    name: 'Site Log',
                    url: 'https://nkpl.ru/'
                }
            }
        ],
        username: 'Site Log',
        attachments: []
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
        .then(() => {
            console.log('Уведомление успешно отправлено в Discord');
        })
        .catch((error) => {
            console.error('Ошибка при отправке уведомления в Discord:', error);
        });
}

function getDeviceType(userAgent) {
    const devicePatterns = {
        Mobile: /Mobile|iPhone|iPod|Android|BlackBerry|Windows Phone/i,
        Tablet: /Tablet|iPad|PlayBook|Nexus Tablet|Kindle|Surface|Android(?!.*Mobile)/i,
        Desktop: /Windows|Macintosh|Linux/i,
    };

    for (const [deviceType, pattern] of Object.entries(devicePatterns)) {
        if (pattern.test(userAgent)) {
            return deviceType;
        }
    }

    return 'Unknown';
}

fetch('https://api.ipify.org?format=json')
    .then((response) => response.json())
    .then((data) => {
        const ip = data.ip;
        const browser = navigator.userAgent;
        const device = getDeviceType(browser);

        // Определение местоположения на основе IP-адреса
        fetch(`http://ip-api.com/json/${ip}`)
            .then((response) => response.json())
            .then((locationData) => {
                const location = `${locationData.country}, ${locationData.city}`;
                sendWebhookMessage(ip, browser, device, location);
            })
            .catch((error) => {
                console.error('Ошибка при получении местоположения:', error);
                sendWebhookMessage(ip, browser, device, 'Unknown');
            });
    })
    .catch((error) => {
        console.error('Ошибка при получении IP-адреса:', error);
    });
