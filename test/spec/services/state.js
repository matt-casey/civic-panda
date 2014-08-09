'use strict';

describe('Service: State', function () {

  // load the service's module
  beforeEach(module('civicPandaApp'));

  // instantiate service
  var State;
  beforeEach(inject(function (_State_) {
    State = _State_;
  }));

  it('should do something', function () {
    expect(!!State).toBe(true);
  });

});
