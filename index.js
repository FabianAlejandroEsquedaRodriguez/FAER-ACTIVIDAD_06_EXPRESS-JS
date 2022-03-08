const express = require('express');
const socket = require('socket.io');//Socket for server
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
})

//Archivos estaticos que va a tomar el servidor
app.use(express.static('publico'));

//Configuracion del socket
const io = socket(server);

io.on('connection', (socket) => {
  //El cliente se conecto con el sevidor
  console.log('Se hizo la conexión con el socket', socket.id);

  socket.on('chat', (data) => {//data es el que se envia desde chat.js (listener)
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);//Hacer boradcast a los demas clientes pero no a ti mismo
  })
});