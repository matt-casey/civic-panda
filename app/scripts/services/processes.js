'use strict';

angular.module('civicPandaApp')
  .service('Processes', function Processes($http, $q) {

  	var processes = [];

    init();
    
    function init() {
      var deferred = $q.defer();
      $http.get('data/processes.json')
        .success(function(response) {
          processes = response;
          deferred.resolve();
        })
      .error(function(){
        deferred.reject();
      });
      return deferred.promise;
    }

  	function get(id){
      for (var y = 0; y < processes.length; y ++)
        if(processes[y].id === id) return processes[y];
  	}

    return {
      init: init,
    	get: get
    }
  });
