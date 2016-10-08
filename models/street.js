var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  body: {type: String, required: true}
  commentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
  createdAt: {type: Date, default: Date.now}
});


var streetSchema = new mongoose.Schema({
  address: String,
  crossStreets: String,
  locations: [{type: ObjectId, ref: 'Bar'}],
  comments: [commentSchema],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});
