var messages = [];

if (localStorage.getItem('messages')) {
    messages = JSON.parse(localStorage.getItem('messages'));
}

function addMessage(message) {
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function getMessages() {
    return messages;
}