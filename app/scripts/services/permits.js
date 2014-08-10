'use strict';

angular.module('civicPandaApp')
  .service('Permits', function Permits(Filters) {
    return {
    	// dumb return of all permit list
    	getAll: getAll,
    	// returns filtered list based on selections taken as params
    	getFiltered: getFiltered
    }
  });
