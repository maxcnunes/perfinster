'use strict';

angular.module('perfinsterApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularFileUpload',
  'siyfion.sfTypeahead'
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
      .when('/transactions/import', {
        templateUrl: 'partials/transaction-import',
        controller: 'TransactionImportCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
