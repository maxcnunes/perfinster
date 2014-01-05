'use strict';

var mongoose = require('mongoose'),
      Category = mongoose.model('Category');

exports.get = function(req, res) {
  return Category.find({}, function (err, items) {
    if (!err) {
      return res.json(items);
    } else {
      return res.status(500).send(err);
    }
  });
};

// exports.create = function(req, res) {
//   var Category = new Category(req.body);
//   return Category.save(function (err, result) {
//     if (!err) {
//       return res.json(result);
//     } else {
//       return res.status(500).send(err);
//     }
//   });
// };