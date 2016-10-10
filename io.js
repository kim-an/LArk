var io = require('socket.io')();

io.on('connection', function (socket){
  console.log('connected to socket.io!');
  // receive test event to client
  socket.on('test', function(data){
    console.log(data);
    // response upon receiving test event
    socket.emit('test', 'server got it!');
  });
});

module.exports = io;
