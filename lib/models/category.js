'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  associations: [String]
});

mongoose.model('Category', CategorySchema);
