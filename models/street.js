var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  body: {
      type: String,
      required: true
  },
  commentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});


var streetSchema = new mongoose.Schema({
  address: String,
  crossStreetsCoordinates: {
    type: [
        {
          lat: String,
          lng: String
        }
    ],
    validate:[arrayLimit];
  }
  comments: [commentSchema],
  createdAt: {
      type: Date,
      default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  }
});

function arrayLimit(val) {
  return val.length <= 2;

module.exports = mongoose.model('Street', streetSchema);



