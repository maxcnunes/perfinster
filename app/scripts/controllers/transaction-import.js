'use strict';

angular.module('perfinsterApp')
.controller('TransactionImportCtrl', function ($scope, $http, $upload, $location, CategoryService, TransactionService) {
  $scope.actions = ['Active', 'Ignore', 'Nothing'];
  $scope.back = function () {
    $location.path('/transactions');
  };

  $scope.onFileSelect = function($files) {
    $scope.upload = TransactionService.extractRead($files, $upload, function(transactions) {
      CategoryService.getAll().success(function(categories) {
        transactions.forEach(prepareTransaction);
        $scope.transactions = transactions;
        $scope.categories = {
          name: 'categories',
          local: categories.map(function(category) { return category.name; })
        };
      });
    });
  };

  $scope.save = function () {
    TransactionService.extractImport($scope.transactions).success($scope.back);
  };

  var IMPORTING = 2;
  function prepareTransaction(trans) {
    trans.action = trans.status === IMPORTING ? $scope.actions[0] : $scope.actions[2];
    trans.statusDesc = TransactionService.getStatusDesc(trans);
  };

  $scope.isDisabled = function (trans) {
    if (trans.status === 1) {//Activated
      return true;
    } 
    return false;
  };

  $scope.totalCredit = function () {
    if (!$scope.transactions) { return 0; };

    var total = 0;
    $scope.transactions.forEach(function (trans) {
      if (trans.type === 'CREDIT') {
        total += trans.amount;
      }
    });
    return total;
  };

  $scope.totalDebit = function () {
    if (!$scope.transactions) { return 0; };
    
    var total = 0;
    $scope.transactions.forEach(function (trans) {
      if (trans.type === 'DEBIT') {
        total += trans.amount;
      }
    });
    return total;
  };

  $scope.total = function () {
    return $scope.totalCredit() - $scope.totalDebit();
  };
});
