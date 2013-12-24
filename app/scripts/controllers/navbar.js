'use strict';

angular.module('perfinsterApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Transactions',
      'link': '#/transactions'
    },
    {
      'title': 'About',
      'link': '#'
    },
    {
      'title': 'Contact',
      'link': '#'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
