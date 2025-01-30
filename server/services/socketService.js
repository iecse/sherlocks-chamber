import { Server } from 'socket.io';
let io;

export const initSocket = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

export const emitToAllClients = (event, data) => {
    io.emit(event, data);
};

export const emitToClient = (socketId, event, data) => {
    io.to(socketId).emit(event, data);
};
