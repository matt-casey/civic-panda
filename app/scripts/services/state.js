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

  	function overwriteState(newState) {
  		currentProperty = 0;
  		state = angular.copy(newState);
  	}

  	function getProperties() {
  		var output = [];
  		for (var i = 0; i < state.properties.length; i++) {
  			output.id   = state.properties[i].id
  			output.name = state.properties[i].name
  		};
  		return output;
  	}

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
