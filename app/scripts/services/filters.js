'use strict';

angular.module('civicPandaApp')
  .service('Filters', function Filters($http) {
  	// BASICALLY CONSTANTS

    var data,
        categories,
        types,
        subtypes,
        changes;

    $http.get('data/filters.json').success(function(response) {
      data = response;
      categories = data.categories;
      types = data.types;
      subtypes = data.subtypes;
      changes = data.changes;
    });


    return {
    	categories: categories,
    	types: types,
    	subtypes: subtypes,
    	changes: changes
    }
  });
