var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
  id: 1,
  text: 'Hola soy un mensaje',
  author: 'Roberto'
}];

// Middleware de express para gestionar las plantillas
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.status(200).send('Hola Mundo!!');
});

// Esto escucha la conexión de websockect
io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(8080, function() {
  console.log('Running server http://localhost:8080');
});
