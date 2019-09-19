let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/ui/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(3003, function(){
  console.log('listening on *:3003');
});