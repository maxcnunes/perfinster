'use strict';

var mongoose = require('mongoose'),
      Transaction = mongoose.model('Transaction'),
      fs = require('fs');

exports.import = function(req, res) {
  fs.readFile(__dirname + '/../../test/lib/fixtures/extract.ofx', 'utf8', function(err, ofxData) {
    if (err) throw err;

    return Transaction.parseOfx(ofxData, function (err) {
      if (!err) {
        return res.json(202);
      } else {
        return res.status(500).send(err);
      }
    });
  });
};