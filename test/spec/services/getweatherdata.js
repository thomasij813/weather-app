'use strict';

describe('Service: getWeatherData', function () {

  // load the service's module
  beforeEach(module('weatherApp'));

  // instantiate service
  var getWeatherData;
  beforeEach(inject(function (_getWeatherData_) {
    getWeatherData = _getWeatherData_;
  }));

  it('should do something', function () {
    expect(!!getWeatherData).toBe(true);
  });

});
