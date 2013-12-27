'use strict';

angular.module('perfinsterApp')
  .directive('mask', ['$filter', function ($filter) {
    return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) return;

        // ctrl.$formatters.unshift(function (a) {
        //   return $filter(attrs.format)(ctrl.$modelValue)
        // });

        ctrl.$parsers.unshift(function (viewValue) {
          elem.setMask(attrs.mask);
          return elem[0].value;
        });
      }
    };
}]);