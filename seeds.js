require('dotenv').config();
require('./config/database');
var User = require('./models/user');
var Street = require('./models/street');

User.remove({}, function() {
  Street.remove({}, function() {
    var street = new Street({
      address: '1900 S Broadway, Los Angeles',
      coordinates: {lat: '34.0305689', lng: '-118.2663225'},
      crossStreetsCoordinates: [
        {lat: '34.031446', lng: '-118.265743'},
        {lat: '34.029429', lng: ' -118.267120'}
      ]
    });
    street.save(function(err) {
      console.log(err);
      console.log(street);
      process.exit();
    });
  });
});
