const socket = io();
let username = '';

function enterChat() {
    const usernameInput = document.getElementById('usernameInput');
    username = usernameInput.value.trim();

    if (username !== '') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
        document.getElementById('currentUser').textContent = `شما: ${username}`;
    }
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText !== '') {
        const data = { username, message: messageText };
        socket.emit('chat message', data);
        input.value = '';
    }
}

socket.on('chat message', (data) => {
    const messageList = document.getElementById('messageList');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (data.username === username) {
        messageDiv.classList.add('sent');
    } else {
        messageDiv.classList.add('received');
    }

    const usernameSpan = document.createElement('div');
    usernameSpan.classList.add('username');
    usernameSpan.textContent = data.username;
    messageDiv.appendChild(usernameSpan);

    const textNode = document.createTextNode(data.message);
    messageDiv.appendChild(textNode);

    const timeSpan = document.createElement('span');
    timeSpan.classList.add('time');
    timeSpan.textContent = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    messageDiv.appendChild(timeSpan);

    messageList.appendChild(messageDiv);

    // اسکرول فقط اگه نزدیک پایین هستی
    const isNearBottom = messageList.scrollHeight - messageList.scrollTop - messageList.clientHeight < 100;
    if (isNearBottom) {
        messageList.scrollTo({ top: messageList.scrollHeight, behavior: 'smooth' });
    }
});

document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('usernameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        enterChat();
    }
});
