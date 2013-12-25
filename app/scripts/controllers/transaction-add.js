'use strict';

angular.module('perfinsterApp')
  .controller('TransactionAddCtrl', function ($scope, $http) {
    $http.get('/api/transactions').success(function(transactions) {
      $scope.transactions = transactions;
    });
  });
