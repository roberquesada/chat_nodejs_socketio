var author = prompt('Write your name');
var socket = io.connect('http://localhost:8080', {'forceNew': true});

socket.on('messages', function(data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data.map(function(elem, index) {
    return(`<div><strong>${elem.author}</strong>: <em>${elem.text}</em></div>`);
  }).join(' ');

  document.getElementById('messages').innerHTML = html;
}

function addMessage(event) {
  var domTexto = document.getElementById('texto');
  var payload = {
    author: author,
    text: domTexto.value
  };

  socket.emit('new-message', payload);
  domTexto.value = '';
  return false;
}
