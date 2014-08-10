'use strict';

angular.module('civicPandaApp')
  .service('Permits', function Permits($http, $q) {

  	var permits = [];

  	init();
  	
	function init() {
    	var deferred = $q.defer();
	    $http.get('data/permits.json')
		    .success(function(response) {
		      permits = response;
		      deferred.resolve();
		    })
	    .error(function(){
	    	deferred.reject();
	    });
	    return deferred.promise;
    }

  	function getAll(){
  		return permits;
  	}

  	/*
  		sample filter:
  		getFiltered({ types: [2], categories: [1], changes: [0], subtypes : [1]})
  	*/
  	function isInCategories(permit, categories){
  		if(categories.length === 0) return null;
  		for (var y = 0; y < categories.length; y ++)
  			if(permit.categories.indexOf(categories[y]) > -1) return true;
  		return false;
  	}

  	function isInTypes(permit, types){
  		for (var y = 0; y < types.length; y ++)
  			if(permit.types.indexOf(types[y]) > -1) return true;
  		return false;
  	}

	function isInSubtypes(permit, subtypes){
	  	for (var y = 0; y < subtypes.length; y ++)
  			if(permit.subtypes.indexOf(subtypes[y]) > -1) return true;
  		return false;
  	}

	function isInChanges(permit, changes){
	  	for (var y = 0; y < changes.length; y ++)
  			if(permit.changes.indexOf(changes[y]) > -1) return true;
  		return false;
  	}

  	function getFiltered(filter){
  		var filteredList = [];
  		var permit;
  		var hasId;
  		var isSubtypes;
  		var isTypes;
  		var isCategories;
  		var hasSubtypes;
  		var hasTypes;
  		var hasCategories;
  		for (var x = 0; x < permits.length; x++){
  			permit = permits[x];

			isSubtypes = isInSubtypes(permit, filter.subtypes);
			isTypes = isInTypes(permit, filter.types);
			isCategories = isInCategories(permit, filter.categories);

			hasSubtypes = filter.subtypes.length !== 0;
			hasTypes = filter.types.length !== 0;
			hasCategories = filter.categories.length !== 0;

			if(!hasSubtypes && !hasTypes && hasCategories){
				hasId = !isSubtypes && !isTypes && isCategories;
			}
			if(!hasSubtypes && hasTypes && hasCategories){
				hasId = !isSubtypes && isTypes && isCategories;
			}
			if(hasSubtypes && hasTypes && hasCategories){
				hasId = isSubtypes && isTypes && isCategories
			}
  			

	  		if(isInChanges(permit, filter.changes) === true) hasId = true;
	  		
	  		if (hasId === true) filteredList.push(permit);
	  	}
  		return filteredList;
  	}

    return {
    	init: init,
    	// dumb return of all permit list
    	getAll: getAll,
    	// returns filtered list based on selections taken as params
    	getFiltered: getFiltered
    }
  });
