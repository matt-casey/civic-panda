'use strict';

angular.module('civicPandaApp')
  .service('Permits', function Permits($http) {

  	var permits = [];

	$http.get('data/permits.json').success(function(response) {
  		permits = response;
    });

  	function getAll(){
  		return data;
  	}

  	/*
  		sample filter:
  		getFiltered({ types: [2], categories: [1], changes: [0], subtypes : [1]})
  	*/
  	function isInCategories(permit, categories){
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

  		for (var x = 0; x < permits.length; x++){
  			permit = permits[x];
  			hasId = false;

	  		hasId = isInCategories(permit, filter.categories);

	  		if(hasId === true){
	  			hasId = isInTypes(permit, filter.types);
	  		}

	  		if(hasId === true){
	  			hasId = isInSubtypes(permit, filter.subtypes)
	  		}

	  		if(isInChanges(permit, filter.changes) === true) hasId = true;
	  		
	  		if (hasId === true) filteredList.push(permit);
	  	}
	  	console.log(filteredList);
  		return filteredList;
  	}

    return {
    	// dumb return of all permit list
    	getAll: getAll,
    	// returns filtered list based on selections taken as params
    	getFiltered: getFiltered
    }
  });
