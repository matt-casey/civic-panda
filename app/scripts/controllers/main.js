'use strict';

angular.module('civicPandaApp')
  .controller('MainCtrl', function ($scope, $location, $timeout, Permits, Filters, Processes, User, State) {
  	Permits.init();
  	$scope.blurImage = false;
  	function init() {
  		$timeout(function(){
  			$scope.blurImage = true;
  		}, 2500)
  	}
  	init();
  });
