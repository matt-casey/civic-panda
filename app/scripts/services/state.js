'use strict';

angular.module('civicPandaApp')
  .service('State', function State(Permits) {

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

    var permitsCost = 0,
        permitsMaxDuration = 0,
        permitsMinDuration = 0; 

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

  	function makeSelection(type, index) {
  		state.properties[currentProperty]['selections'][type] = [index];
  	}

  	function toggleSelection(type, index) {
  		var location = getSelection()[type].indexOf(index);
  		if (location < 0) {
  			state.properties[currentProperty]['selections'][type].push(index);
  		}
  		else{
  			state.properties[currentProperty]['selections'][type].splice(location, 1);
  		}

      calculePermitsInfo()
  	}

    function calculePermitsInfo(){
      var permits = Permits.getFiltered(getSelection());
      sumPermitsDuration(permits);
      sumPermitsCost(permits);
    }

    function sumPermitsCost(permits){
      permitsCost = 0;
      for(var x = 0; x < permits.length; x++){
        permitsCost += permits[x].cost;
      }
    }

    function sumPermitsDuration(permits){
      permitsMinDuration = 0;
      for(var x = 0; x < permits.length; x++){
        permitsMinDuration += permits[x].minDuration;
      }
      permitsMaxDuration = 0;
      for(var x = 0; x < permits.length; x++){
        permitsMaxDuration += permits[x].maxDuration;
      }
    }

    function getPermitsInfo(){
      return {
        cost: permitsCost,
        maxDuration: permitsMaxDuration,
        minDuration: permitsMinDuration,
      }
    }

    return {
    	overwriteState: overwriteState,
    	properties: getProperties,
    	selection: getSelection,
    	setProperty: setProperty,
    	toggleSelection: toggleSelection,
    	makeSelection: makeSelection,
      getPermitsInfo : getPermitsInfo
    }
  });
