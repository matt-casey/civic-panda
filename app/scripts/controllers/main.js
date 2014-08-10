'use strict';

angular.module('civicPandaApp')
  .controller('MainCtrl', function ($scope, $location, Permits, Filters, Processes, User, State) {
  	Permits.init();
  });
