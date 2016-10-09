var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { apiKey: process.env.MAPS_KEY });
});

module.exports = router;
