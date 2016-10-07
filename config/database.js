var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(`${process.env.DB_URI}`);

mongoose.connection.once('open', function() {
  console.log(`You're connected to: ${con.host}:${con.port}`)
});

module.exports = mongoose;
