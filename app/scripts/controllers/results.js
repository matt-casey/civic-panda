'use strict';

angular.module('civicPandaApp')
  .controller('ResultsCtrl', function ($scope, Permits, Processes, User, State) {

  	$scope.permits = [];
  	$scope.processSummary = {};
  	var selection = State.selection();

  	Permits.init().then(function(){
  		$scope.permits = Permits.getAll();
  		Processes.init().then(function(){
  			updatePermitsWithProcesses();
  			calculateProcessSummary();
  		})
  	});

  	function updatePermitsWithProcesses(){
  		for(var x = 0; x < $scope.permits.length; x ++){
	  		var permit = $scope.permits[x];
	  		permit.process = Processes.get(permit.id);
  		}
  	} 





  	///////
  	function isInFinalApproval (process) {
  		var counter = 0;
  		for(var x = 0; x < process.length; x ++){
  			if(process[x].completed === true)
  				counter ++;
  		}
  		return counter === 3;
  	}

  	function isInWorkingProgress (process) {
  		var counter = 0;
  		for(var x = 0; x < process.length; x ++){
  			if(process[x].completed === true)
  				counter ++;
  		}
  		return counter === 2;	
  	}

  	function isInWorkApproval (process) {
  		var counter = 0;
  		for(var x = 0; x < process.length; x ++){
  			if(process[x].completed === true)
  				counter ++;
  		}
  		return counter === 1;
  	}

  	function isInApplication (process) {
  		var counter = 0;
  		for(var x = 0; x < process.length; x ++){
  			if(process[x].completed === true)
  				counter ++;
  		}
  		return counter === 0;	
  	}

	function isPending (process) {
  		var counter = 0;
  		for(var x = 0; x < process.length; x ++){
  			if(process[x].pending === true)
  				counter ++;
  		}
  		return counter !== 0;	
  	}

  	function calculateProcessSummary(){
  		var amountDone = 0;
  		var amountPending = 0;
		for(var x = 0; x < $scope.permits.length; x ++){
			var permit = $scope.permits[x];
			var process = permit.process.process;
			if(isInFinalApproval && process[3].completed === true) amountDone++;
			if(isPending(process)) amountPending++;
		}
		$scope.processSummary = {
			done : amountDone,
			pending : amountPending
		}
  	}
  	///////
  });
