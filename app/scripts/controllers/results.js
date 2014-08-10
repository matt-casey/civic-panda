'use strict';

angular.module('civicPandaApp')
  .controller('ResultsCtrl', function ($scope, Permits, Processes, User, State) {

	$scope.permits = [];
	$scope.processSummary = {};

    init();
    $scope.isLoggedIn = false;

    function init(){    
    	Permits.init().then(function(){
            var selection = State.selection();
    		$scope.permits = Permits.getFiltered(selection);
        		Processes.init().then(function(){
        			updatePermitsWithProcesses();
        			calculateProcessSummary();
        		})
    	});
    };

    $scope.$on('loggingIn', function() {
        $scope.isLoggedIn = true; 
        init(); 
    });
    function addEmptyProcesses(){
        var emptyProcess = 
        {
            "process": [
              {
                "id": 1,
                "name": "application",
                "completed": false,
                "pending": false
              },
              {
                "id": 2,
                "name": "work approval",
                "completed": false,
                "pending": false
              },
              {
                "id": 3,
                "name": "working progress",
                "completed": false,
                "pending": false
              },
              {
                "id": 4,
                "name": "final approval",
                "completed": false,
                "pending": false
              }
            ]
        };
        for(var x = 0; x < $scope.permits.length; x ++){
            var permit = $scope.permits[x];
            permit.process = emptyProcess;
        }
    }
	function updatePermitsWithProcesses(){
        if ($scope.isLoggedIn === false){
            addEmptyProcesses();
            return
        }
	
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
