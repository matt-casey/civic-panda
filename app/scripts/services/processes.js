'use strict';

angular.module('civicPandaApp')
  .service('Processes', function Processes($http) {

  	var processes = [];

    $http.get('data/processes.json').success(function(response) {
  		processes = response;
    });

  	function get(id){
      for (var y = 0; y < processes.length; y ++)
        if(processes[y].id === id) return processes[y];
  	}

    return {
    	get: get
    }
  });
