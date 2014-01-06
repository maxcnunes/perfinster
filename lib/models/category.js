'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema; 

var CategorySchema = new Schema({
  name: String,
  associations: [String]
});

CategorySchema.statics.SaveInTransaction = function (raw, transaction, done) {
  if (!raw.categoryName) { return done(); };

  var Category = mongoose.model('Category');
  var Transaction = mongoose.model('Transaction');
  return Transaction.findOne({ name: raw.categoryName }, function (error, category) {
    if (category) {
      transaction.category = category._id;
      done();
    } else {
      var category = new Category();
      category.name = raw.categoryName;
      category.save(function () {
        transaction.category = category._id;
        done();
      });
    };
  });
};

mongoose.model('Category', CategorySchema);