'use strict';

angular.module('civicPandaApp')
  .controller('OverviewCtrl', function ($scope, User, State) {
  	User.logOut();
  });
