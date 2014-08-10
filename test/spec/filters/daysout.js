'use strict';

describe('Filter: daysOut', function () {

  // load the filter's module
  beforeEach(module('civicPandaApp'));

  // initialize a new instance of the filter before each test
  var daysOut;
  beforeEach(inject(function ($filter) {
    daysOut = $filter('daysOut');
  }));

  it('should return the input prefixed with "daysOut filter:"', function () {
    var text = 'angularjs';
    expect(daysOut(text)).toBe('daysOut filter: ' + text);
  });

});
