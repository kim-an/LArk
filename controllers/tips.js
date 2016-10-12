var Tip = require('../models/tip');

module.exports = {
  index: index,
  show: show
};

function index(req, res) {
  Tip.find({}, function(err, tips) {
    if (err) return res.status(err.statusCode || 500).json(err);
    res.json(tips);
  });
}

function show(req, res) {
  var id = req.params.id;
  Tip.findById(id, function(err, tip) {
    if (err) return res.status(err.statusCode || 500).json(err);
    res.json(tip);
  });
}
