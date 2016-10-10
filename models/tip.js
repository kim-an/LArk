var mongoose = require('mongoose');

var tipSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  coordinates: {
    type: {
      lat: String,
      lng: String
    },
    required: true
  },
  comment: {
    message: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
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
  ],
  permit: {
    type: Boolean,
    required: true
  },
  cost: String,
  costExceptions: [String]
});


module.exports = mongoose.model('Street', tipSchema);

