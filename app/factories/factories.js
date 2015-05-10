/**
 * Factory: AirportsFactory
 */
angular.module('RyanairApp')
    .factory('AirportsFactory', ['$q', '$http', '$location', function AirportsFactory($q, $http, $location) {
        'use strict';
        var exports = {};
        exports.airports = {};
        exports.countries = {};

        exports.getAirports = function() {
            // Get all airports
            var deferred = $q.defer();
            // return $http.get('http://www.ryanair-test.herokuapp.com/api/airports')
            return $http.get('app/json/airports.json')
                .success(function(data) {
                    exports.airports = data;
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        exports.getCountries = function() {
            // Get all countries
            var deferred = $q.defer();
            // return $http.get('http://www.ryanair-test.herokuapp.com/api/countries')
            return $http.get('app/json/countries.json')
                .success(function(data) {
                    exports.countries = data;
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        return exports;
    }]);
