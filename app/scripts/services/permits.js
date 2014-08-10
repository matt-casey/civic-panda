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
  		getFiltered({ types: [1], categories: [1], types: [1], changes: [1], subtypes[1]})
  	*/
  	function getFiltered(filter){
  		var filteredList = [];
  		var permit;
  		var hasId;

  		for (var x = 0; x < permits.length; x++){
  			permit = permits[x];
  			hasId = false;
	  		for (var y = 0; y < filter.categories.length; y ++)
	  			if (permit.categories.indexOf(filter.categories[y]) > -1 ) hasId = true;

	  		for (var y = 0; y < filter.types.length; y ++)
	  			if (permit.types.indexOf(filter.types[y]) > -1 ) hasId = true;

	  		for (var y = 0; y < filter.changes.length; y ++)
	  			if (permit.changes.indexOf(filter.changes[y]) > -1) hasId = true;

	  		for (var y = 0; y < filter.subtypes.length; y ++)
	  			if (permit.subtypes.indexOf(filter.subtypes[y]) > -1 ) hasId = true;

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
