var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

/* GET home page. */
router.get('/', usersController.index);

module.exports = router;
