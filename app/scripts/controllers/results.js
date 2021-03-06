'use strict';

angular.module('civicPandaApp')
  .controller('ResultsCtrl', function ($scope, Permits, Processes, User, State) {

	$scope.permits = [];
	$scope.processSummary = {};

    init();
    $scope.isLoggedIn = false;

    $scope.groups = [];

    function init(){    
    	Permits.init().then(function(){
            var selection = State.selection();
    		$scope.permits = Permits.getFiltered(selection);
        		Processes.init().then(function(){
        			updatePermitsWithProcesses();
        			calculateProcessSummary();
                    catorizePermits();
        		})
    	});
    };

    function catorizePermits() {
        $scope.groups = [];
        if ($scope.isLoggedIn === true){
            var nowPermits = [];
            if($scope.processSummary.now > 0){
                for(var x = 0; x < $scope.permits.length; x ++){
                    var permit = $scope.permits[x];
                    if(permit.process.process[0].completed === false && permit.pending !== true)
                        nowPermits.push(permit);
                }
            }

            if(nowPermits.length > 0){
                $scope.groups.push({ name: "Now", permits: nowPermits });
                console.log($scope.groups);
            }
            var pendingPermits = [];
            if($scope.processSummary.pending > 0){
                for(var x = 0; x < $scope.permits.length; x ++){
                    var permit = $scope.permits[x];
                    if(isPending(permit.process.process))
                        pendingPermits.push(permit);
                }
            }

            if(pendingPermits.length > 0){
                $scope.groups.push({ name: "Pending", permits: pendingPermits});
            }

            var donePermits = [];
            if($scope.processSummary.done > 0){
                for(var x = 0; x < $scope.permits.length; x ++){
                    var permit = $scope.permits[x];
                    if(permit.process.process[3].completed === true)
                        donePermits.push(permit);
                }
            }
            if(pendingPermits.length > 0){
                $scope.groups.push({ name: "Done", permits: donePermits});
            }
        }else{
            $scope.groups.push({ name: null, permits: $scope.permits});
        }
    }


    $scope.$on('stateChange', function() {
        $scope.isLoggedIn = true; 
        init(); 
    });
    function addEmptyProcesses(){
        var emptyProcess = 
        {
            "process": [
              {
                "id": 1,
                "name": "Application",
                "completed": false,
                "pending": false
              },
              {
                "id": 2,
                "name": "Work approval",
                "completed": false,
                "pending": false
              },
              {
                "id": 3,
                "name": "In progress",
                "completed": false,
                "pending": false
              },
              {
                "id": 4,
                "name": "Final approval",
                "completed": false,
                "pending": false
              }
            ]
        };
        for(var x = 0; x < $scope.permits.length; x ++){
            var permit = $scope.permits[x];
            permit.process = emptyProcess;
            if(permit.process)
                permit.process.process = addWebInfo(permit.process.process);
            permit.newPermit = true;
        }
    }
	function updatePermitsWithProcesses(){
        if ($scope.isLoggedIn === false){
            addEmptyProcesses();
            return
        }
	
		for(var x = 0; x < $scope.permits.length; x ++){
			var permit = $scope.permits[x];
            var process = Processes.get(permit.id) 
            if(process)
                process.process = addWebInfo(process.process);
            permit.process = process;
		}
	} 

    function addWebInfo(process){
        var p = process;
        if( p[0].completed === false ){
            p[0].web = {
                name: "Start",
                linke: "www.cityofboston.gov/isd/building/permits.asp"
            }
        }
        if( p[1].completed === false && p[0].completed === true){
            p[0].web = null;
            p[1].web = {
                name: "Start",
                link: "www.cityofboston.gov/isd/building/permits.asp"
            }
        }
        if( p[2].completed === false && p[1].completed === true && p[0].completed === true){
            p[0].web = null;
            p[1].web = null;
            p[2].web = {
                name: "Start",
                link: "www.cityofboston.gov/isd/building/permits.asp"
            }
        }
        return p;
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
		return counter > 0;	
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
        var total = $scope.permits.length;
		$scope.processSummary = {
			done : amountDone,
			pending : amountPending,
            outstanding: total - amountDone,
            now: total - amountDone - amountPending,
            total: total
		}
	}
	///////
  });
