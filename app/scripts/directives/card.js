'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:card
 * @description
 * # card
 */
angular.module('weatherApp')
  .directive('card', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/templates/card.html'
    };
  });
