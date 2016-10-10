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
  coordinates: {
    type: {
      lat: String,
      lng: String
    },
    required: true
  },
  crossStreetsCoordinates: {
    type: [
        {
          lat: String,
          lng: String
        }
    ],
    validate:[arrayLimit]
  },
  comments: [commentSchema],
  createdAt: {
      type: Date,
      default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  },
  invalidHours: [
    {
      day: {
        type: String,
        enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      // TODO: validate start and end time to 0000 - 2400 format
      startTime: String,
      endTime: String
    }
  ]
});

function arrayLimit(val) {
  return val.length <= 2;
}

module.exports = mongoose.model('Street', streetSchema);



