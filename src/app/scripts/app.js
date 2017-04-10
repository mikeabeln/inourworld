'use strict';

(function () {

angular
  .module('inOurWorldApp', [
    'masonry',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    'ngMaterial'
  ])
  .config(function ($locationProvider, $routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/a', {
        templateUrl:'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        resolve: {
          user: function ($q, $http, $location) {
            var deferred = $q.defer();
            $http.get('/user').then(function success(user) {
              deferred.resolve(user);
            }, function error(err) {
              console.log(err);
              $location.path('/');
              deferred.reject(err);
            }); return deferred.promise;
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

  });

})();

