'use strict';

var mongoose = require('mongoose'),
      Transaction = mongoose.model('Transaction');

exports.read = function(req, res) {
  return Transaction.parseOfxFile(req.files.file.path, function (err, result) {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).send(err);
    }
  });
};

exports.import = function(req, res) {
  return Transaction.import(req.body, function (err, result) {
    if (!err) {
      return res.send(202);
    } else {
      return res.status(500).send(err);
    }
  });
};
