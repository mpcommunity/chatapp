const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('یه کاربر متصل شد!');

    // دریافت پیام و پخش با نام کاربر
    socket.on('chat message', (data) => {
        io.emit('chat message', data); // { username, message }
    });

    socket.on('disconnect', () => {
        console.log('یه کاربر قطع شد!');
    });
});

server.listen(3000, () => {
    console.log('سرور رو پورت 3000 اجرا شد');
});