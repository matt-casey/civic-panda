'use strict';

angular.module('civicPandaApp')
  .service('State', function State() {
  	var selections = {
  		categories: [],
    	types:      [],
    	subtypes:   [],
    	changes:    [],
    	progresses: [],
    	zones:      []
  	}

    return {
    	// things user selected, overwritten on User.logIn/logOut
    	selections: selections
    	// maybe unnecessary
    	currentPermits: currentPermits
    }
  });
