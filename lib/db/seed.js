var path = require('path'),
      fs = require('fs');

module.exports = function () {
  // Bootstrap models
  var modelsPath = path.join(__dirname, '/../models');
  fs.readdirSync(modelsPath).forEach(function (file) {
    require(modelsPath + '/' + file);
  });

  // Populate empty DB with dummy data
  require('./dummydata');
};