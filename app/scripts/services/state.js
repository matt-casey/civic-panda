'use strict';

angular.module('civicPandaApp')
  .service('State', function State() {

  	var currentProperty = 0;
  	var state = {
  		name: '',
  		properties: [
	  		{
	  			id: 0,
	  			name: '',
	  			selections: {
			  		categories: [],
			    	types:      [],
			    	subtypes:   [],
			    	changes:    [],
			    	progresses: [],
			    	zones:      []
			  	}
	  		}
  		]
  	}

	// used to simulate log in and log out
  	function overwriteState(newState) {
  		currentProperty = 0;
  		state = angular.copy(newState);
  	}

  	// returns names and ids of all available properties
  	function getProperties() {
  		var output = [];
  		for (var i = 0; i < state.properties.length; i++) {
  			var prop = {};
  			prop.id   = state.properties[i].id;
  			prop.name = state.properties[i].name;
  			output.push(prop);
  		};
  		return output;
  	}

  	// gets the selections for the selected property used in user input section
  	function getSelection() {
  		return state.properties[currentProperty].selections;
  	}

  	function setProperty(index) {
  		index < state.properties.length ? currentProperty = index : currentProperty = 0;
  	}

    return {
    	overwriteState: overwriteState,
    	properties: getProperties,
    	selection: getSelection,
    	setProperty: setProperty
    }
  });
