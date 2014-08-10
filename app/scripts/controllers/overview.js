'use strict';

angular.module('civicPandaApp')
  .controller('OverviewCtrl', function ($scope, $location, User, State) {
  	User.logOut();

  	$scope.logIn = User.logIn;
  	$scope.logOut = User.logOut;
  	$scope.username = State.getUsername;
  	
  	$scope.project = State.property();
  	$scope.projectDetails = State.getPermitsInfo();

  	$scope.$on('summationUpdated', function() {
  		$scope.projectDetails = State.getPermitsInfo();
  	});
  	$scope.$on('stateChange', function() {
  		$scope.project = State.property();
  		$scope.projectDetails = State.getPermitsInfo();
  		if ($scope.username().length === 0) {
		    $location.path('user-input/0');
        $scope.$emit('logout');
  		}
  		else {
        $location.path('results');
        $scope.$emit('login');
  		}
  	});
  });
