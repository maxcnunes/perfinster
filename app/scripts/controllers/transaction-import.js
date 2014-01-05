'use strict';

angular.module('perfinsterApp')
.controller('TransactionImportCtrl', function ($scope, $http, $upload, $location, CategoryService, TransactionService) {
  $scope.back = function () {
    $location.path('/transactions');
  };

  $scope.onFileSelect = function($files) {
    $scope.upload = TransactionService.importFile($files, $upload, function(transactions) {
      CategoryService.getAll().success(function(categories) {
        $scope.transactions = transactions;
        $scope.categories = {
          name: 'categories',
          local: categories.map(function(category) { return category.name; })
        };
      });
    });
  };
});
