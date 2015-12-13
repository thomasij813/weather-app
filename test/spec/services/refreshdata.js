'use strict';

describe('Service: refreshData', function () {

  // load the service's module
  beforeEach(module('weatherApp'));

  // instantiate service
  var refreshData;
  beforeEach(inject(function (_refreshData_) {
    refreshData = _refreshData_;
  }));

  it('should do something', function () {
    expect(!!refreshData).toBe(true);
  });

});
