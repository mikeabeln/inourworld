'use strict';

(function () {

angular.module('inOurWorldApp').controller('MainCtrl', ['$scope', '$window' ,
  	function ($scope, $window) {

	    $scope.awesomeThings = [
	      'HTML5 Boilerplate',
	      'AngularJS',
	      'Karma'
	    ];

	    $window.mdc.autoInit();



  }]);

})();
