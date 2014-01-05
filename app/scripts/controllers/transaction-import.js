'use strict';

angular.module('perfinsterApp')
.controller('TransactionImportCtrl', function ($scope, $http, $upload, $location, CategoryService) {
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
      CategoryService.getAll().success(function(categories) {
        $scope.transactions = data;
        $scope.exampleData = {
          name: 'categories',
          local: categories.map(function(category) { return category.name; })
        };
      });
    });
  };

  

  $scope.foo = null;
});
