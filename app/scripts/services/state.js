'use strict';

angular.module('civicPandaApp')
  .service('State', function State() {
    return {
    	// things user selected, overwritten on User.logIn/logOut
    	selections: selections
    	// maybe unnecessary
    	currentPermits: currentPermits
    }
  });
