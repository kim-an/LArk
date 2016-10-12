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
router.post('/', function(req, res, next){
  Tip.create({coordinates: req.body}, function(err, tip){
    console.log(tip);
    res.status(201).json(tip);
  });
});

router.put('/', function(req, res, next){
  // TODO grab tip by id
});

module.exports = router;

