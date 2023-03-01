require('dotenv').config()

const path = require('node:path');
const express = require('express');
const cookieParser = require('cookie-parser')
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

const Canvas = require('./models/Canvas');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cookieParser());
app.use(express.json());
app.use(routers);
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected.`);

    socket.on('join', (roomId) => {
        console.log(`Client ${socket.id} joined room ${roomId}.`);
        socket.join(roomId);

        // Listen for drawing events.
        socket.on('drawing', async (drawing) => {
            if (!drawing) {
                return;
            }

            await Canvas.updateOne({ _id: roomId }, { $push: { objects: drawing } });
            socket.broadcast.to(roomId).emit('drawing', drawing);
        });

        // Resync all the clients.
        socket.on('resyncall', async (canvas) => {
            await Canvas.updateOne({ _id: roomId }, { objects: canvas });
            socket.broadcast.to(roomId).emit('resync', canvas);
        });

        // Leave the room.
        socket.on('leave', () => {
            console.log(`Client ${socket.id} left room ${roomId}.`);
            socket.leave(roomId);

            // Clean up listeners.
            socket.removeAllListeners('drawing');
            socket.removeAllListeners('resyncall');
            socket.removeAllListeners('leave');
        });
    });

    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected.`);
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});