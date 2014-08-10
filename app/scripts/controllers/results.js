'use strict';

angular.module('civicPandaApp')
  .controller('ResultsCtrl', function ($scope, Permits, Processes, User, State) {

  	$scope.permits = [];
  	var selection = State.selection();

  	Permits.init().then(function(){
  		$scope.permits = Permits.getAll();
  		Processes.init().then(function(){
  			updatePermitsWithProcesses();
  		})
  	});

  	function updatePermitsWithProcesses(){
  		for(var x = 0; x < $scope.permits.length; x ++){
	  		var permit = $scope.permits[x];
	  		permit.process = Processes.get(permit.id);
  		}
  	} 

  });
