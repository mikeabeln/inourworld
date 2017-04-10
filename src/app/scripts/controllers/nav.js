'use strict';

(function () {

angular.module('inOurWorldApp').controller('NavCtrl', ['$rootScope', '$window',
  	function ($rootScope, $window) {

        document.querySelector('.demo-menu').addEventListener('click', function() {
            $rootScope.$broadcast('drawer-open');
        });

        document.querySelector('.iow-drawer').addEventListener('click', function() {
            $rootScope.$broadcast('drawer-close');
        });

		this.menu = function() {
			$rootScope.$broadcast('simple-menu');
		};


        $window.mdc.autoInit(document, function () {});

  }]);

})();
