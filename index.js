const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.emit('chat message', 'ようこそチャットアプリへ');
  socket.broadcast.emit('chat message', '新しいユーザーが接続しました');
  socket.on('disconnect', function() {
    io.emit('chat message', 'あるユーザーの接続が切れました');
  });
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
})

server.listen(3000, function() {
  console.log('listening on *:3000');
});