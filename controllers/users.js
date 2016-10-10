var User = require('../models/user');
var Tip = require('../models/tip');

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
