var User = require('../models/user');
var Street = require('../models/street');

module.exports = {
  index: index,
  welcome: welcome
};

function welcome(req, res, next){
  res.render('welcome');
}

function index(req, res, next) {
  res.render('index', { user: req.user, apiKey: process.env.MAPS_KEY });
}
