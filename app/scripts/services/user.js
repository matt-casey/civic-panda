'use strict';

angular.module('civicPandaApp')
  .service('User', function User(State) {
  	var emptySelections = {
  		categories: [],
    	types:      [],
    	subtypes:   [],
    	changes:    [],
    	progresses: [],
    	zones:      []
  	}

  	var phil = {
  		selections: {
	  		categories: [],
	    	types:      [],
	    	subtypes:   [],
	    	changes:    [],
	    	progresses: [],
	    	zones:      []
	  	}
  	}

  	function logOut() {
  		State.selections = angular.copy(emptySelections)
  	}

  	function logIn() {
  		// NOT angular.copy so that choices remain if log out then back in (without refresh)
  		State.selections = phil.selections;
  	}

    return {
    	// overwrites State.selections to predefined
    	logIn: logIn,
    	// overwrites State.selections to empty
    	logOut: logOut,
    	// returns bool
    	isLoggedIn: isLoggedIn
    }
  });
