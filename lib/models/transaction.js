'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ofx = require('ofx'),
    async = require('async'),
    fs = require('fs'),
    parser = require('../utils/parser');

var TransactionSchema = new Schema({
  type: String,
  datePosted: Date,
  amount: Number,
  FITID: { type: Number, unique: true },
  checkNum: Number,
  memo: String
});

TransactionSchema.statics.parseOfxFile = function (filepath, callback) {
  fs.readFile(filepath, 'utf8', function(err, ofxData) {
    if (err) throw err;

    return parseOfx(ofxData, callback);
  });
};

var parseOfx = function (data, callback) {
  var ofxData = ofx.parse(data);
  var Transaction = mongoose.model('Transaction');
  var transactions = ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;

  async.eachLimit(transactions, 10, function eachTransaction(raw, done) {
    Transaction.findOne({ FITID: raw.FITID }, function importNew(err, result) {
      if (err) { return done(err) };
      if (result) { return done(); };

      var trans = new Transaction();
      trans.type = raw.TRNTYPE;
      trans.datePosted = parser.stringToDate(raw.DTPOSTED);
      trans.amount = raw.TRNAMT;
      trans.checkNum = raw.CHECKNUM;
      trans.memo = raw.MEMO;

      trans.save(done);
    });
  }, callback);
};

mongoose.model('Transaction', TransactionSchema);