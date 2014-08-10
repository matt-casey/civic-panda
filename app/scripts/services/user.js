'use strict';

angular.module('civicPandaApp')
  .service('User', function User($location, $rootScope, State) {
  	var emptySelection = {
  		name: '',
  		properties: [
	  		{
	  			id: 0,
	  			name: 'Your new project',
	  			saved: false,
	  			selections: { categories: [], types: [], subtypes: [], changes: [], progresses: [], zones: [] }
	  		}
  		]
  	}

  	var users = [
  		{
  	  		name: 'Phil',
  	  		properties: [
  		  		{
  		  			id: 0,
  		  			name: 'Impact Radiators',
  		  			saved: true,
  		  			selections: { categories: [], types: [], subtypes: [], changes: [], progresses: [], zones: [] }
  		  		}
  	  		]
  	  	}
  	]

  	function logOut() {
  		State.overwriteState(emptySelection);
  		$rootScope.$broadcast('logIn');
  	}

  	function logIn(userId) {
  		var index = userId || 0;
  		State.overwriteState(users[index]);
  		$rootScope.$broadcast('logOut');
  	}

    return {
    	// overwrites State.selections to predefined
    	logIn: logIn,
    	// overwrites State.selections to empty
    	logOut: logOut
    }
  });
