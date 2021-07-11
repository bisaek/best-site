//const is = require('@bisaek/is')
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    //socket.emit('message', 'hallo world')
    //socket.broadcast.emit('message', 'a new user joined');
    /*socket.on('disconnect', () => {
        console.log('disconnect');
        io.emit('message', 'a user disconnect');
    })*/

    socket.on('chatMessage', (msg, user, roomId) => {
        io.emit('message' + roomId, user + ': ' + msg, 'userMessage');
    })
    socket.on('newConnect', (user, roomId) => {
        console.log('hallo ' + user);
        if (user === '') io.emit('message' + roomId, 'a new user joined', 'systemMessage');
        else io.emit('message' + roomId, user + ' joined', 'systemMessage');
    })
    socket.on('changeUsername', (newUsername, oldUsername, roomId) => {
        if (oldUsername == '' || oldUsername == undefined) io.emit('message' + roomId, 'a unknown user changed username to ' + newUsername, 'changesUsername systemMessage');
        else io.emit('message' + roomId, oldUsername + ' changed username to ' + newUsername, 'changesUsername systemMessage');
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});