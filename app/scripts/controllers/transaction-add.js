'use strict';

angular.module('perfinsterApp')
  .controller('TransactionAddCtrl', function ($scope, $http, $location, TransactionService) {
    $scope.save = function () {
      TransactionService.create($scope.transaction);
      $location.path('/transactions');
    };
  });
