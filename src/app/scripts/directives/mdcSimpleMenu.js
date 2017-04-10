'use strict';

(function () {

angular.module('inOurWorldApp').directive('mdcSimpleMenu', ['$rootScope','$window', function($rootScope, $window) {
    return {
      type: 'A',
      link: function(scope, elem) {
        elem.addClass('mdc-simple-menu');
        scope.menu = $window.mdc.menu.MDCSimpleMenu.attachTo(elem[0]);
        scope.$on('simple-menu', function() {
          if(scope.menu.open === true) {
            scope.menu.hide();
          } else {
            scope.menu.show();
          }
        });
        // scope.$on('MDCSimpleMenu:open', function() {
        //     console.log('menu is open!!', scope.menu);
        // });
        scope.$on('MDCSimpleMenu:selected', function(arg) {
            console.log(arg);
            scope.menu.hide();
        });

      }
    };
  }]);

 })();