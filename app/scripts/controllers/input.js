'use strict';

angular.module('civicPandaApp')
  .controller('InputCtrl', function ($scope, $location, $routeParams, State, Filters) {
  	$scope.selection = State.selection();
  	$scope.$on('stateChange', function(){
  		$scope.selection = State.selection();
  		$scope.currentStep = 0;
  	})
  	$scope.toggle = State.toggleSelection;
  	$scope.select = State.makeSelection;

  	Filters.getList('types').then( function(data) {$scope.types = data} );
  	Filters.getList('subtypes').then( function(data) {$scope.subtypes = data} );
  	Filters.getList('changes').then( function(data) {$scope.changes = data} );

  	var names = ['What are you making', 'Your business information', 'Where are you located'];
  	var forms = ['views/input_one.html', 'views/input_two.html', 'views/input_three.html'];

  	$scope.steps = [
  		{id: 0, display: '1', name: names[0], type: 'categories', output: "I'm making a ",  form: forms[0] },
  		{id: 1, display: '2', name: names[1], type: 'types', 	  output: "I'm opening a ", form: forms[1] },
  		{id: 2, display: '3', name: names[2], type: 'zones',      output: "",               form: forms[2] }
  	];

  	$scope.currentStep = State.currentStep;

  	$scope.setStep = function(ind) {
  		$scope.currentStep = ind;
  	}

  	$scope.allowNextStep = function(type) {
  		return $scope.selection[type].length > 0;
  	}

  	$scope.nextStep = function() {
  		if ($scope.currentStep < $scope.steps.length - 1) { 
  			$scope.currentStep ++;
  		}
  		else {
  			$location.path('results');
  		};
  	}

  	$scope.lastStep = function() {
  		if ($scope.currentStep > 0) {
  			$scope.currentStep --;
  		}
  	}

  	$scope.isSelected = function(type, ind) {
  		return $scope.selection[type].indexOf(ind) > -1;
  	}
  });
