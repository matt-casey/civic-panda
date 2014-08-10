'use strict';

angular.module('civicPandaApp')
  .controller('OverviewCtrl', function ($scope, $rootScope, $location, User, State) {
  	User.logOut();

  	$scope.logIn = User.logIn;
  	$scope.logOut = User.logOut;
  	$scope.getUsername = State.getUsername;
  	
  	$scope.project = State.property();
  	$scope.projectDetails = State.getPermitsInfo();


    getOtherProjects();

    function getOtherProjects(){
      var tmpPorjects = State.properties();
      $scope.projects = []
      for(var x = 0; x< tmpPorjects.length; x++){
        if(tmpPorjects[x].id !== $scope.project.id){
          $scope.projects.push(tmpPorjects[x])
        }
      }
      if($scope.projects.length > 0){
        $scope.secondProject = $scope.projects[0];
      }else{
        $scope.secondProject = {};
      }
    }

    $scope.setSecondProject = function(){
      $scope.project = $scope.secondProject;
      State.setProperty($scope.project.id);
      getOtherProjects();
    }


    $scope.$on('summationUpdated', function() {
  		$scope.projectDetails = State.getPermitsInfo();
  	});
  	$scope.$on('stateChange', function() {
  		$scope.project = State.property();
  		$scope.projectDetails = State.getPermitsInfo();
      getOtherProjects();
  		if ($scope.getUsername().length === 0) {
		    $location.path('user-input');
  		}
  		else {
	        $location.path('results');
  		}
  	});
  });
