/**
 * Factory: AirportsFactory
 */
angular.module('RyanairApp')
    .factory('AirportsFactory', ['$q', '$http', '$location', function AirportsFactory($q, $http, $location) {
        'use strict';
        var exports = {};
        exports.airports = {};

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

        return exports;
    }]);
