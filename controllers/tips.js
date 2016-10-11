var Tip = require('../models/tip');

module.exports = {
  index: index
};

function index(req, res) {
  Tip.find({}, function(err, tips) {
    if (err) return res.status(err.statusCode || 500).json(err);
    res.json(tips);
  });
}
