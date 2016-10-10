var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(`${process.env.DB_URI}`);
var con = mongoose.connection;
mongoose.connection.once('open', function() {
  console.log(`You're connected to: ${con.host}`);
});

module.exports = mongoose;
