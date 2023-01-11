const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: [
      'http://localhost:3000',
    ],
  },
});


const WSPORT = process.env.WSPORT ?? 3010;

io.on('connection', (socket) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);
  console.log(roomId);
  

  socket.on('newGameEvent', (data) => {
    io.in(roomId).emit('newGameEvent', data);
  });

  socket.on('disconnect', () => {
    socket.leave(roomId);
  });
});


server.listen(WSPORT, () => {
  console.log(`Server ready. Port: ${WSPORT}`);
});