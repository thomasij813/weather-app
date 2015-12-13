'use strict';

describe('Service: weatherData', function () {

  // load the service's module
  beforeEach(module('weatherApp'));

  // instantiate service
  var weatherData;
  beforeEach(inject(function (_weatherData_) {
    weatherData = _weatherData_;
  }));

  it('should do something', function () {
    expect(!!weatherData).toBe(true);
  });

});
