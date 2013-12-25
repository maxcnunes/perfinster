'use strict';

angular.module('perfinsterApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/transactions', {
        templateUrl: 'partials/transaction-list',
        controller: 'TransactionListCtrl'
      })
      .when('/transactions/add', {
        templateUrl: 'partials/transaction-add',
        controller: 'TransactionAddCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });