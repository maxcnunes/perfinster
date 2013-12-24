'use strict';

var mongoose = require('mongoose'),
      Transaction = mongoose.model('Transaction');

exports.import = function(req, res) {
  if (!req.files.file) { return res.status(400).send('No file attached'); }

  return Transaction.parseOfxFile(req.files.file.path, function (err) {
    if (!err) {
      return res.json(202);
    } else {
      return res.status(500).send(err);
    }
  });
};