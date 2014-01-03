'use strict';

angular.module('perfinsterApp')
.controller('TransactionImportCtrl', function ($scope, $http, $upload) {
  $scope.back = function () {
    $location.path('/transactions');
  };

  $scope.onFileSelect = function($files) {
    var file = $files[0];
    $scope.upload = $upload.upload({
      url: '/api/transactions/import', //upload.php script, node.js route, or servlet url
      headers: {},
      file: file,
    }).progress(function(evt) {
      console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    }).success(function(data, status, headers, config) {
      $scope.transactions = data;
    });
  };

  $scope.exampleData = {
    name: 'accounts',
    local: ['1 - House', '1.1 - Internet', '2 - Transport']
  };

  $scope.multiExample = [
  {
    name: 'accounts',
    prefetch: 'https://twitter.com/network.json',
    remote: 'https://twitter.com/accounts?q=%QUERY'
  },
  {
    name: 'trends',
    prefetch: 'https://twitter.com/trends.json'
  }];

  $scope.foo = null;
});
