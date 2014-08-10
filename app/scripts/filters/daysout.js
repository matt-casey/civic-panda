'use strict';

angular.module('civicPandaApp')
  .filter('daysOut', function () {
    return function (input, format) {
    	var dateFormat = format || "MMM Do 'YY"
      	return moment().add('days', input).format(dateFormat);
    };
  });
