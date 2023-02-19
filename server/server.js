require('dotenv').config()

const path = require('node:path');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const routers = require('./routes');

const port = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_CONN);
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

var board = Array(null);

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(routers);
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

io.on('connection', (socket) => {
    console.log('A client connected.');

    // socket.emit('resync', board);

    socket.on('drawing', (drawing) => {
        board.push(drawing);
        socket.broadcast.emit('drawing', drawing);
    });

    socket.on('resyncall', (canvas) => {
        board = canvas;
        socket.broadcast.emit('resync', canvas);
    });
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})