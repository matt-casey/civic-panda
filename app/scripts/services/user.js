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
  		  			name: 'Phil’s Pizza',
  		  			saved: true,
  		  			selections: { types: [1], categories: [1], changes: [0], subtypes : [1], progresses: [], zones: [] }
  		  		},
            {
              id: 1,
              name: 'My house',
              saved: true,
              selections: { types: [3], categories: [1], changes: [1], subtypes : [], progresses: [], zones: [] }
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
