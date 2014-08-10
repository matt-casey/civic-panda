'use strict';

angular.module('civicPandaApp')
  .controller('MainCtrl', function ($scope, $location, Permits, Filters, Processes, User, State) {
  	Permits.init();
  	$scope.$on('login', function() {
  		$scope.$broadcast('loggingIn');
  	});
  	$scope.$on('logout', function() {
  		$scope.$broadcast('loggingOut');
  	});
  });
