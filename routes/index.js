var express = require('express');
var router = require('express').Router();
var passport = require('passport');
var usersController = require('../controllers/users');

var Tip = require('../models/tip');

/* GET home page. */

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
router.post('/tips', isLoggedIn, function(req, res, next){
  Tip.create({
    userID: req.user._id,
    parkingType: req.body.parkingType,
    coordinates: {lat: req.body.coordinatesLat, lng: req.body.coordinatesLng},
    validHours: req.body.validHours,
    maxTime: req.body.maxTime,
    permit: req.body.permit,
    cost: req.body.cost,
    costExceptions: req.body.costExceptions,
    comment: req.body.comment
  },
    function (err, tip) {
      res.status(201).json(tip);
    }
  );
});

router.put('/tips/:id', function(req, res, next){
  // tip find by id, find user id
  // if that user id exists in the the flaggersId array
  // don't push it
  Tip.findById(req.body.tipId, function(err, tip){
    if (err) next(err);
    if (!tip.flaggerIds.includes(req.user._id.toString())){
      tip.flagged += 1;
      tip.flaggerIds.push(req.user._id);
      tip.save(function(err){
        res.status(200).json(tip);
      });
    }
    res.status(400, 'You have already flagged this tip');
  });
});

router.put('/tip', function(req, res, next){
  Tip.findById(req.body.tipId, function(err, tip){
    if (err) next(err);
    tip.parkingType = req.body.parkingType;
    tip.maxTime = req.body.maxTime;
    tip.permit = req.body.permit;
    tip.cost = req.body.cost;
    tip.comment = req.body.comment;
    tip.save(function(err){
      res.status(200).json(tip);
    });
  });
});

router.delete('/tip', function(req, res, next){
  Tip.findByIdAndRemove(req.body.tipId, function(err, tip){
    if (err) next(err);
    res.status(200).json(tip);
  });
});

module.exports = router;

// check to see if user is logged in
function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

