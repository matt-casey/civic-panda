'use strict';

angular.module('civicPandaApp')
  .controller('OverviewCtrl', function ($scope, $rootScope, $location, User, State) {
  	User.logOut();

  	$scope.logIn = User.logIn;
  	$scope.logOut = User.logOut;
  	$scope.getUsername = State.getUsername;
  	
  	$scope.project = State.property();
  	$scope.projectDetails = State.getPermitsInfo();

  	$scope.$on('summationUpdated', function() {
  		$scope.projectDetails = State.getPermitsInfo();
  	});
  	$scope.$on('stateChange', function() {
  		$scope.project = State.property();
  		$scope.projectDetails = State.getPermitsInfo();
  		if ($scope.getUsername().length === 0) {
		    $location.path('user-input/0');
  		}
  		else {
	        $location.path('results');
  		}
  	});
  });
