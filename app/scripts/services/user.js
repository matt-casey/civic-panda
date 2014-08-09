'use strict';

angular.module('civicPandaApp')
  .service('User', function User() {
    return {
    	// overwrites State.selections to predefined
    	logIn: logIn,
    	// overwrites State.selections to empty
    	logOut: logOut,
    	// returns bool
    	isLoggedIn: isLoggedIn
    }
  });
