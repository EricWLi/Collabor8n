const path = require('node:path');

const express = require('express');
const { Server } = require("socket.io");

const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
const port = process.env.PORT || 8080;
const board = Array(null);

app.use(express.static(path.join(__dirname, '../client/build')));

io.on('connection', (socket) => {
    console.log('A client connected.');

    for (let line of board) {
        socket.emit('drawing', line);
    }

    socket.on('drawing', (drawing) => {
        board.push(drawing);
        socket.broadcast.emit('drawing', drawing);
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})