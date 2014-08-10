'use strict';

angular.module('civicPandaApp')
  .controller('InputCtrl', function ($scope, $location, State) {
  	// STEPS ARE 1-INDEXED, NOT 0
  	$scope.steps = [
  		{id: 0, display: '1', name: 'What are you making?',      continue: function() { return State.selection().categories.length }, output: "I'm making a ",  form: 'views/input_one.html'},
  		{id: 1, display: '2', name: 'Your business information', continue: function() { return State.selection().types.length }, 	  output: "I'm opening a ", form: 'views/input_two.html'},
  		{id: 2, display: '3', name: 'Where are you located?',    continue: function() { return State.selection().zones.length },      output: "",               form: 'views/input_three.html'}
  	];
  	$scope.currentStep = 0;

  	$scope.setStep = function(ind) {
  		$scope.currentStep = ind;
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
  		if ($scope.currentStep > 0) $scope.currentStep --;
  	}
  });
