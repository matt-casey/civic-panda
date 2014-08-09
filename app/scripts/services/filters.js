'use strict';

angular.module('civicPandaApp')
  .service('Filters', function Filters() {
  	// BASICALLY CONSTANTS
    return {
    	categories: categories,
    	types: types,
    	subtypes: subtypes,
    	changes: changes,
    	progresses: progresses,
    	zones: zones
    }
  });
