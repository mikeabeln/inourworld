'use strict';

(function () {

angular.module('inOurWorldApp').directive('mdcTextfield', ['$window', function($window) {
    return {
      type: 'A',
      link: function($scope, $elem) {
        $elem.addClass('mdc-textfield');
        var texfield = $window.mdc.textfield.MDCTextField.attachTo($elem[0]);
        $scope.$on('destroy', function() {
          texfield.destroy();
        });
      }
    };
  }]);

 })();