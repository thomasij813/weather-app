'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('MainCtrl', function($scope, addWeatherData, refreshData) {
    $scope.data = [];
    $scope.addLocation = function() {
      addWeatherData($scope.location, $scope.data);
    };
    $scope.refreshData = function() {
      refreshData($scope.data);
    };
  });
