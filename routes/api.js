var router = require('express').Router();
var tipsCtrl = require('../controllers/tips');

router.get('/tips', tipsCtrl.index);

module.exports = router;
