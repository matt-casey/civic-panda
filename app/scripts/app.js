'use strict';

angular
  .module('civicPandaApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/user-input', {
        templateUrl: 'views/input.html',
        controller: 'InputCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/user-input'
      });
  });
