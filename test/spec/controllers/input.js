'use strict';

describe('Controller: InputCtrl', function () {

  // load the controller's module
  beforeEach(module('civicPandaApp'));

  var InputCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InputCtrl = $controller('InputCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
