import 'dotenv/config';
import express from 'express';
import { createServer } from 'node:http';
import { Server as SocketServer } from 'socket.io';

const app = express(); //srv Express (no compatible con socket)
const server = createServer(app); //Pasamos el srv Express para crear el servidor http de node (si compatible)
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:5000',
  },
}); //Pasamos el srv http y obtenemos el servidor socket y lo llamamos io
//CORS para responder al front
const port = process.env.PORT ?? 3000;

// io es el srv socket, su método .on() define que cuando haya un evento haga... (lo q indiquemos en la callback)
io.on('connection', (socket) => {
  console.log(' » Usuario Conectado:', socket.client.conn.id);

  socket.on('message', (data) => {
    console.log('  - Message:', data);
    socket.broadcast.emit('messageEmit', data);
  });
});

server.listen(port, () => {
  //Escucha el http srv, no Express srv
  console.log('  ▒▓ Server ok en puerto', port, ' ▓▒');
});
