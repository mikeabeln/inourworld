'use strict';

(function () {

angular.module('inOurWorldApp').directive('mdcRipple', ['$window', function($window) {
    return {
      type: 'A',
      link: function($scope, $elem) {
        $elem.addClass('mdc-ripple-surface');
        var ripple = $window.mdc.ripple.MDCRipple.attachTo($elem[0]);
        $scope.$on('destroy', function() {
          ripple.destroy();
        });
      }
    };
  }]);

 })();