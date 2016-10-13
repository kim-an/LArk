var io = require('socket.io')();
var User = require('./models/user');
var Tip = require('./models/tip');

io.on('connection', function (socket){
  console.log('connected to socket.io!');
  // get all tips and pass to client
  socket.on('getTips', function() {
    Tip.find({}, function(err, tips) {
      socket.emit('renderMarkers', tips);
    });
  });
  socket.on('flagTip', function(tipId){
    Tip.findByIdAndUpdate(tipId, { $inc: { flagged: 1}}, function (err, tip){
    });
  });
});

module.exports = io;
