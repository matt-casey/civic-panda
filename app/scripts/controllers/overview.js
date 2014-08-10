'use strict';

angular.module('civicPandaApp')
  .controller('OverviewCtrl', function ($scope, User, State) {
  	User.logOut();
  	$scope.project = State.property();
  	$scope.projectDetails = State.getPermitsInfo();
  	$scope.$on('summationUpdated', function() {
  		$scope.projectDetails = State.getPermitsInfo();
  	});
  });
