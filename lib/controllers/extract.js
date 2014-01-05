'use strict';

var mongoose = require('mongoose'),
      Transaction = mongoose.model('Transaction');

exports.read = function(req, res) {
  return Transaction.parseOfxFile(req.files.file.path, function (err, result) {
    if (!err) {
      return res.status(202).json(result);
    } else {
      return res.status(500).send(err);
    }
  });
};

exports.import = function(req, res) {
  return Transaction.parseOfxFile(req.files.file.path, function (err, result) {
    if (!err) {
      return res.status(202).json(result);
    } else {
      return res.status(500).send(err);
    }
  });
};
