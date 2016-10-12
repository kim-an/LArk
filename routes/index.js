var express = require('express');
var router = require('express').Router();
var passport = require('passport');
var usersController = require('../controllers/users');

var Tip = require('../models/tip');

/* GET home page. */

router.get('/welcome', usersController.welcome);

router.get('/', usersController.index);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email' ] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

// logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// create new tip based on click event
router.post('/tips', function(req, res, next){
  Tip.create({
    parkingType: req.body.parkingType,
    coordinates: {lat: req.body.coordinatesLat, lng: req.body.coordinatesLng},
    validHours: {day: req.body.validHoursDay,
                startTime: req.body.validHoursStart,
                endTime: req.body.validHoursEnd},
    maxTime: req.body.maxTime,
    permit: req.body.permit,
    costField: req.body.costField,
    costExceptions: req.body.costExceptions
  },
    function (err, tip) {
      res.status(201).json(tip);
    }
  );
});

router.put('/', function(req, res, next){
  // TODO grab tip by id
});

module.exports = router;

