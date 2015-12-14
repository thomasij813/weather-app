'use strict';

/**
 * @ngdoc service
 * @name weatherApp.getWeatherData
 * @description
 * # getWeatherData
 * Factory in the weatherApp.
 */
angular.module('weatherApp')
  .factory('addWeatherData', function ($http) {

    var processResults = function(weatherData) {
      var weatherIcons = {
        'clear-day': 'wi wi-day-sunny',
        'clear-night': 'wi wi-night-clear',
        'rain': 'wi wi-rain',
        'snow': 'wi wi-snow',
        'sleet': 'wi wi-sleet',
        'wind': 'wi wi-strong-wind',
        'fog': 'wi wi-fog',
        'cloudy': 'wi wi-cloudy',
        'partly-cloudy-day': 'wi wi-day-cloudy',
        'partly-cloudy-night': 'wi wi-night-alt-cloudy'
      };

      var now = new Date();
      var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var today = startOfDay / 1000;

      return weatherData.daily.data.filter(function(day) {
        return (day.time) >= today;
      }).map(function(day) {
        var high = Math.floor(day.temperatureMax);
        var low = Math.floor(day.temperatureMin);
        return {
          date: day.time * 1000,
          avTemp: Math.floor((high + low) / 2),
          high: high,
          low: low,
          icon: weatherIcons[day.icon]
        };
      });
    };

    var increaseIndex = function() {
      var forecastItems = this.weather.length - 1;
      if (this.displayIndex + 1 > forecastItems) {
        this.displayIndex = 0;
      } else {
        this.displayIndex += 1;
      }
    };

    var decreaseIndex = function() {
      var forecastItems = this.weather.length - 1;
      if (this.displayIndex - 1 < 0) {
        this.displayIndex = forecastItems;
      } else {
        this.displayIndex -= 1;
      }
    };

    var getData = function(location, weatherData) {
      var weatherObj = {
        search: location,
        increaseIndex: increaseIndex,
        decreaseIndex: decreaseIndex,
        displayIndex: 0
      };
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + location)
        .then(function(results) {
          console.log(results.data);
          var data = results.data.results[0];
          var coords = data.geometry.location;
          var city = '';
          data.address_components.forEach(function(component) {
            if (component.types[0] === 'locality') {
              city = component.long_name;
            }
          });
          weatherObj.location = {
            coords: coords,
            city: city
          };
          return weatherObj.location;
        })
        .then(function(location) {
          console.log(location);
          var weatherApiString = 'https://api.forecast.io/forecast/0110c78ee7ac09b1306c5115c1a56d4b/';
          return $http.jsonp(weatherApiString + location.coords.lat + ',' + location.coords.lng + '?callback=JSON_CALLBACK')
            .then(function(weatherResults){
              console.log(weatherResults.data);
              return processResults(weatherResults.data);
            });
        })
        .then(function(weatherDataResults) {
          weatherObj.weather = weatherDataResults;
          if (weatherObj.location.city) {
            weatherData.push(weatherObj);
          } else {
            console.log('Sorry, I do not know where that is...');
          }
          console.log(weatherData);
        });
    };

    return getData;
});
