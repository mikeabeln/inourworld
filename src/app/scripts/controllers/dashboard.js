'use strict';

(function () {

angular.module('inOurWorldApp').controller('DashboardCtrl', ['$scope', 'user', '$http', '$routeParams',
  	function ($scope, user, $http, $routeParams) {

  		$('.viewport').css('height', $(window).height());

      $scope.user = user;
      console.log(user);

      $http.get('/dash/' + $routeParams.dashId).then(function success(dashboard) {
        // body...
        $scope.dashboard = dashboard;
      }, function error(err) {
        console.log(err);
      });



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

	    // $window.mdc.autoInit(document, function () {});


  }]);

})();

