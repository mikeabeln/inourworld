'use strict';

(function () {

angular.module('inOurWorldApp').directive('mdcTemporaryDrawer', ['$rootScope','$window', function($rootScope, $window) {
    return {
      type: 'A',
      link: function($scope, $elem) {
        $elem.addClass('mdc-temporary-drawer');
        $scope.drawer = $window.mdc.drawer.MDCTemporaryDrawer.attachTo($elem[0]);
        $scope.$on('drawer-open', function() {
            $scope.drawer.open = true;
        });
        $scope.$on('drawer-close', function() {
            $scope.drawer.open = false;
        });
        $scope.$on('destroy', function() {
          $scope.drawer.destroy();
        });
      }
    };
  }]);

 })();