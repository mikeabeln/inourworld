'use strict';

(function () {

angular.module('inOurWorldApp').controller('MainCtrl', ['$rootScope', '$scope', '$window', '$http', '$location',
  	function ($rootScope, $scope, $window, $http, $location) {

	    $scope.awesomeThings = [
	      'HTML5 Boilerplate',
	      'AngularJS',
	      'Karma'
	    ];

	    $scope.cred = {};
	    $scope.newUser = {};

	 //    $http.get('/').then(function success (data) {
		// 	    	console.log(data, 'is the response');
		// 	    }, function error (e) {
		// 	    	console.log('error', e);
		// });

		$scope.signup = function() {
			console.log($scope.newUser);
	    	$http.post('/a/signup', $scope.newUser).then(function success (user) {
			    	console.log(user, 'is signed up!');
			    	// $rootScope.$broadcast('logged-in');
			    	$location.path('/a');

			    }, function error (e) {
			    	console.log(e.status, e.statusText);
			});
		};

	    $scope.login = function() {
	    	$http.post('/a/login', $scope.cred).then(function success (user) {
			    	console.log(user, 'is logged in!');
			    	$rootScope.$broadcast('logged-in');
			    	$location.path('/a');

			    }, function error (e) {
			    	console.log(e.status, e.statusText, e);
			});
		};

		$scope.logout = function() {
	    	$http.get('/logout').then(function success () {
			    	$rootScope.$broadcast('logged-out');
			    	$location.path('/');

			    }, function error (e) {
			    	console.log(e.status, e.statusText, e);
			});
		};

	    $scope.cards = [{
	    				 main: true,
	    				 title: 'TextileHaus',
	     				 subtitle: 'Business',
	     				 image: 'images/film.jpg',
	     				 supportingText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	     				}, {
	     				 main: true,
	     				 title: 'Junket',
	     				 subtitle: 'Second card subtitle',
	     				 image: 'images/film.jpg',
	     				 supportingText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.'
	     				}, {
	     				 main: true,
	     				 title: 'Krackle Headlamps',
	     				 subtitle: 'Second card subtitle',
	     				 image: 'images/film.jpg',
	     				 supportingText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem sit amet, consectetur adipisicing uncididunt ut labore et dolore magna aliqua.'
	     				}, {
	     				 main: true,
	     				 title: 'Krackle Headlamps',
	     				 subtitle: 'Second card subtitle',
	     				 image: 'images/film.jpg',
	     				 supportingText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem sit amet, consectetur adipisicing uncididunt ut labore et dolore magna aliqua.'
	     				}, {
	     				 main: true,
	     				 title: 'Krackle Headlamps',
	     				 subtitle: 'Second card subtitle',
	     				 image: 'images/film.jpg',
	     				 supportingText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem sit amet, consectetur adipisicing uncididunt ut labore et dolore magna aliqua.'
	     				}
	     			   ];

	    document.getElementById('greeting-form').addEventListener('submit', function(evt) {
		    evt.preventDefault();
		    var firstname = evt.target.elements.firstname.value;
		    var lastname = evt.target.elements.lastname.value;
		    var greeting = 'Hello';
		    if (firstname || lastname) {
		      greeting += ', ';
		      if (firstname && lastname) {
		        greeting += firstname + ' ' + lastname;
		      } else if (lastname) {
		        greeting += 'Mx. ' + lastname;
		      } else {
		        greeting += firstname;
		      }
		    }
		    greeting += '!';

		    document.getElementById('greeting').textContent = greeting;
		});

	    $window.mdc.autoInit(document, function () {});


  }]);

})();
