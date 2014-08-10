'use strict';

angular.module('civicPandaApp')
  .controller('OverviewCtrl', function ($scope, User, State) {
  	User.logOut();

  	$scope.logIn = User.logIn;
  	$scope.username = State.getUsername;
  	
  	$scope.project = State.property();
  	$scope.projectDetails = State.getPermitsInfo();

  	$scope.$on('summationUpdated', function() {
  		$scope.projectDetails = State.getPermitsInfo();
  	});
  	$scope.$on('stateChange', function() {
  		$scope.project = State.property();
  		$scope.projectDetails = State.getPermitsInfo();
  	});
  });
