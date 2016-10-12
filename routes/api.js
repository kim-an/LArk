var router = require('express').Router();
var tipsCtrl = require('../controllers/tips');

router.get('/tips', tipsCtrl.index);

router.get('/tips/:id', tipsCtrl.show)

module.exports = router;
