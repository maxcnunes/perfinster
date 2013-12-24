'use strict';

/*
* Modified from https://github.com/elliotf/mocha-mongoose
*/

var mongoose = require('mongoose');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

before(function (done) {
  mongoose.connection.on('open', done)
});

beforeEach(function (done) {
 (function clearDB() {
   for (var i in mongoose.connection.collections) {
     mongoose.connection.collections[i].remove(function() {});
   }
   return done();
 })();
});

afterEach(function (done) {
 mongoose.disconnect();
 return done();
});