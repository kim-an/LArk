require('dotenv').config();
require('./config/database');
var User = require('./models/user');
var Tip = require('./models/tip');



Promise.all([
  Tip.remove({})
]).then(function() {
  var tip1 = new Tip({
    userID: "57fc315af5eca32f92259e4a",
    parkingType: "Street",
    coordinates: {lat: 34.0305689, lng: -118.2663225},
    comment: "This street parking is whack",
    validHours: [
      {day: 'Sun', startTime: '8am', endTime: '6pm'},
      {day: 'Mon', startTime: '8am', endTime: '6pm'},
      {day: 'Tue', startTime: '8am', endTime: '6pm'},
      {day: 'Wed', startTime: '8am', endTime: '6pm'},
      {day: 'Thu', startTime: '8am', endTime: '6pm'},
      {day: 'Fri', startTime: '8am', endTime: '6pm'},
      {day: 'Sat', startTime: '8am', endTime: '6pm'}
    ],
    permit: false,
    cost: '$1/hr',
    costExceptions: [],
    maxTime: '4hrs'
  });
  return tip1.save()
}).then(function() {
  var tip2 = new Tip({
    userID: "57fc315af5eca32f92259e4a",
    parkingType: "Street",
    coordinates: {lat: 34.031094, lng: -118.267396},
    comment: "This street is Hill st with cross streets: 21st and Washington",
    validHours: [
      {day: 'Sun', startTime: '8am', endTime: '6pm'},
      {day: 'Mon', startTime: '8am', endTime: '6pm'},
      {day: 'Tue', startTime: '8am', endTime: '6pm'},
      {day: 'Wed', startTime: '8am', endTime: '6pm'},
      {day: 'Thu', startTime: '8am', endTime: '6pm'},
      {day: 'Fri', startTime: '8am', endTime: '6pm'},
      {day: 'Sat', startTime: '8am', endTime: '6pm'}
    ],
    permit: false,
    cost: '$1/hr',
    costExceptions: [],
    maxTime: '4hrs'
  });
  return tip2.save()
}).then(function() {
  var tip3 = new Tip({
    userID: "57fc315af5eca32f92259e4a",
    parkingType: "Outdoor Lot",
    coordinates: {lat: 34.030231, lng: -118.266989},
    comment: "This is the Reef parking lot",
    validHours: [
      {day: 'Sun', startTime: '5am', endTime: '11pm'},
      {day: 'Mon', startTime: '5am', endTime: '11pm'},
      {day: 'Tue', startTime: '5am', endTime: '11pm'},
      {day: 'Wed', startTime: '5am', endTime: '11pm'},
      {day: 'Thu', startTime: '5am', endTime: '11pm'},
      {day: 'Fri', startTime: '5am', endTime: '11pm'},
      {day: 'Sat', startTime: '5am', endTime: '11pm'}
    ],
    permit: false,
    cost: '$10/day',
    costExceptions: ['$5 after 4pm']
  });
  return tip3.save()
}).catch(function(err){
  console.log(err);
}).then(function(){
  process.exit();
});

