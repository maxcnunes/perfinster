'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ofx = require('ofx'),
    async = require('async'),
    fs = require('fs'),
    parser = require('../utils/parser');

var TransactionSchema = new Schema({
  type: { type: String, required: true },
  dateCreated: Date,
  datePosted: Date,
  amount: { type: Number, required: true },
  FITID: { type: Number, unique: true },
  checkNum: Number,
  memo: String,
  status: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

TransactionSchema.statics.parseOfxFile = function (filepath, callback) {
  fs.readFile(filepath, 'utf8', function(err, ofxData) {
    if (err) throw err;

    return parseOfx(ofxData, callback);
  });
};

TransactionSchema.statics.import = function (transactions, callback) {
  var Transaction = mongoose.model('Transaction');
  var Category = mongoose.model('Category');
  
  async.eachLimit(transactions, 10, function eachTransaction(raw, done) {
    Transaction.findOne({ FITID: raw.FITID }, function importNew(err, result) {
      var action = raw.action.toLowerCase();
      if (err || result || action === 'nothing') { return done(err); };

      var transaction = new Transaction(raw);
      transaction.status = action  === 'active' ? status.ACTIVED : status.IGNORED;

      Category.SaveInTransaction(raw, transaction, function () {
        transaction.save(done);
      });
    });
  }, callback);
};

var parseOfx = function (data, callback) {
  var ofxData = ofx.parse(data);
  var Transaction = mongoose.model('Transaction');
  var transactions = ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
  var transactionsToImport = [];

  async.eachLimit(transactions, 10, function eachTransaction(raw, done) {
    Transaction.findOne({ FITID: raw.FITID }, function importNew(err, result) {
      if (err) { return done(err) };

      var trans = new Transaction();
      trans.type = raw.TRNTYPE;
      trans.dateCreated = new Date();
      trans.FITID = raw.FITID;
      trans.datePosted = parser.stringToDate(raw.DTPOSTED);
      trans.amount = Math.abs(raw.TRNAMT);
      trans.checkNum = raw.CHECKNUM;
      trans.memo = raw.MEMO;
      trans.status = result ? result.status : status.IMPORTING;

      transactionsToImport.push(trans);
      done();
    });
  }, function (err) {
    callback(err, transactionsToImport);
  });
};

var status = {
  ACTIVED: 1,
  IMPORTING: 2,
  IGNORED: 3
};

mongoose.model('Transaction', TransactionSchema);