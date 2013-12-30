'use strict';

angular.module('perfinsterApp')
  .controller('TransactionAddCtrl', function ($scope, $http, $location, TransactionService) {
    (function init () {
      $scope.master = {};
    })();

    $scope.save = function () {
      TransactionService.create($scope.transaction);
      $location.path('/transactions');
    };

    $scope.reset = function() {
      $scope.transaction = angular.copy($scope.master);
    };

    $scope.back = function () {
      $location.path('/transactions');
    };
  });
