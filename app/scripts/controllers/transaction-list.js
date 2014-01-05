'use strict';

angular.module('perfinsterApp')
  .controller('TransactionListCtrl', function ($scope, $http, TransactionService) {
    TransactionService.getAll().success(function(transactions) {
      $scope.transactions = transactions;
    });
  });
