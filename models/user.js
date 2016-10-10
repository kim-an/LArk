var mongoose = require('mongoose');

// TODO add more user info based off oAuth information
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  googleId: String,
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
