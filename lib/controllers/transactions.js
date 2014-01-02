'use strict';

var mongoose = require('mongoose'),
      Transaction = mongoose.model('Transaction');

exports.get = function(req, res) {
  return Transaction.find({}, function (err, items) {
    if (!err) {
      return res.json(items);
    } else {
      return res.status(500).send(err);
    }
  });
};

exports.create = function(req, res) {
  var transaction = new Transaction(req.body);
  return transaction.save(function (err, result) {
    if (!err) {
      return res.json(result);
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
