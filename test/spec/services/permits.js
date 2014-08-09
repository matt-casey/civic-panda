'use strict';

describe('Service: Permits', function () {

  // load the service's module
  beforeEach(module('civicPandaApp'));

  // instantiate service
  var Permits;
  beforeEach(inject(function (_Permits_) {
    Permits = _Permits_;
  }));

  it('should do something', function () {
    expect(!!Permits).toBe(true);
  });

});
