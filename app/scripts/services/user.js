'use strict';

angular.module('civicPandaApp')
  .service('User', function User(State) {
  	var emptySelection = {
  		name: '',
  		properties: [
	  		{
	  			id: 0,
	  			name: '',
	  			selections: { categories: [], types: [], subtypes: [], changes: [], progresses: [], zones: [] }
	  		}
  		]
  	}

  	var phil = {
  		name: 'Phil',
  		properties: [
	  		{
	  			id: 0,
	  			name: '',
	  			selections: { categories: [], types: [], subtypes: [], changes: [], progresses: [], zones: [] }
	  		}
  		]
  	}

  	function logOut() {
  		State.overwriteState(emptySelection);
  	}

  	function logIn() {
  		State.overwriteState(phil);
  	}

    return {
    	// overwrites State.selections to predefined
    	logIn: logIn,
    	// overwrites State.selections to empty
    	logOut: logOut
    }
  });
