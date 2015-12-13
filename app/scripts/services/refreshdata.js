'use strict';

/**
 * @ngdoc service
 * @name weatherApp.refreshData
 * @description
 * # refreshData
 * Factory in the weatherApp.
 */
angular.module('weatherApp')
  .factory('refreshData', function (addWeatherData) {
    return function(data) {
      var searches = data.map(function(location) {
        return location.search;
      });

      data = [];

      searches.map(function(location) {
        addWeatherData(location, data);
      });
    };
  });
