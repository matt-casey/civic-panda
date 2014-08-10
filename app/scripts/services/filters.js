'use strict';

angular.module('civicPandaApp')
  .service('Filters', function Filters($http, $q) {
  	// BASICALLY CONSTANTS

    var data,
        categories,
        types,
        subtypes,
        changes;

    function loadJson() {
    	var deferred = $q.defer();
	    $http.get('data/filters.json')
	    .success(function(response) {
	      data       = response;
	      categories = data.categories;
	      types      = data.types;
	      subtypes   = data.subtypes;
	      changes    = data.changes;
	      deferred.resolve();
	    })
	    .error(function(){
	    	deferred.reject();
	    });
	    return deferred.promise;
    }

    function getList(type) {
    	var deferred = $q.defer();
    	if (data === undefined){
    		loadJson().then(function() {
    			deferred.resolve(data[type]);
    		})
    	} 
    	else{
    		deferred.resolve(data[type]);
    	}
    	return deferred.promise;
    }

    return {
    	categories: categories,
    	types:      types,
    	subtypes:   subtypes,
    	changes:    changes,
    	getList: 	getList
    }
  });
