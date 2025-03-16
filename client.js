const socket = io();
let username = '';

// ورود به چت
function enterChat() {
    const usernameInput = document.getElementById('usernameInput');
    username = usernameInput.value.trim();

    if (username !== '') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        document.getElementById('currentUser').textContent = `شما: ${username}`;
    }
}

// ارسال پیام
function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText !== '') {
        const data = { username, message: messageText };
        socket.emit('chat message', data); // ارسال پیام با نام کاربر
        input.value = '';
    }
}

// دریافت پیام
socket.on('chat message', (data) => {
    const messageList = document.getElementById('messageList');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    // تشخیص پیام ارسالی یا دریافتی
    if (data.username === username) {
        messageDiv.classList.add('sent');
    } else {
        messageDiv.classList.add('received');
    }

    // اضافه کردن نام و متن پیام
    const usernameSpan = document.createElement('div');
    usernameSpan.classList.add('username');
    usernameSpan.textContent = data.username;
    messageDiv.appendChild(usernameSpan);
    messageDiv.appendChild(document.createTextNode(data.message));

    messageList.appendChild(messageDiv);
    messageList.scrollTop = messageList.scrollHeight;
});

// ارسال پیام با Enter
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ورود با Enter در فرم ورود
document.getElementById('usernameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        enterChat();
    }
});