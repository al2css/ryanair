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













/**
 * Factory: InboxFactory
 */
angular.module('RyanairApp')
    .factory('InboxFactory', ['$q', '$http', '$location', function InboxFactory($q, $http, $location) {
        'use strict';
        var exports = {};
        exports.messages = {};
        exports.unreadMessages = {};
        exports.notifications = {};

        exports.goToMessage = function(id) {
            if (angular.isNumber(id)) {
                $location.path('inbox/email/' + id)
            }
        }

        exports.deleteMessage = function(id, index) {
            this.messages.splice(index, 1);
            // exports.getNrMessages();
            console.log('mess nr:  ', exports.messages.length);
        }

        exports.getMessages = function() {
            // Get all messages in inbox page
            var deferred = $q.defer();
            return $http.get('app/json/emails.json')
                .success(function(data) {
                    exports.messages = data;
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        exports.getUnreadMessages = function() {
            // Get unread unreadMessages in every page
            var deferred = $q.defer();
            return $http.get('app/json/emails.json')
                .success(function(data) {
                    exports.unreadMessages = data;
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;

        };

        exports.getNotifications = function() {
            // Get all notifications every page
            var deferred = $q.defer();
            return $http.get('app/json/notifications.json')
                .success(function(data) {
                    exports.notifications = data;
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        exports.getNrMessages = function() {
            return exports.messages.length;
        };

        return exports;
    }]);


/**
 * Factory: EmailFactory
 */
angular.module('RyanairApp')
    .factory('EmailFactory', ['$q', '$http', '$routeParams', function EmailFactory($q, $http, $routeParams) {
        'use strict';
        var exports = {};
        exports.messages = {};

        exports.reply = function(message) {
            if (message) {
                // we would obviously hit the back-end here
                // but let's just alert what we've typed
                alert('Reply content: ' + message);
            }
        };

        exports.getMessage = function(params) {
            if (params.id) {
                var deferred = $q.defer();
                $http.get('app/json/message/' + params.id + '.json')
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        };

        return exports;
    }]);


/**
 * Factory: FlightsFactory
 * All flights 
 */
angular.module('RyanairApp')
    .factory('FlightsFactory', ['$q', '$http', '$routeParams', '$location', function FlightsFactory($q, $http, $routeParams, $location) {
        'use strict';
        var exports = {};
        exports.flights = {};

        exports.changeView = function(view) {
            $location.path(view); // path, not hash
        };

        exports.goToFlight = function(id) {
            if (angular.isNumber(id)) {
                exports.changeView('flights/' + id);
            }
        };

        exports.addToMyFlights = function(obj, index, parent) {
            // parent / index - needed for obj removal
            // obj - needed for adding to assigned_flights
            if (!angular.isUndefined(obj.id) && angular.isNumber(obj.id)) {
                var myDate = exports.getDate(obj.date);
                var todayDate = exports.getDate(exports.flights.date);
                var isNr = angular.isNumber(myDate) && angular.isNumber(todayDate);

                // prevent to add flights in the passed/future days
                if (isNr && myDate === todayDate) {
                    exports.flights.assigned_flights.push(obj); // Push this flight object into assigned_flights Array
                    // console.warn(exports.flights.assigned_flights.length, exports.flights.assigned_flights);
                    exports.removeFlight(index, parent); // Remove the added obj from available list
                } else {
                    alert('This flight is on ' + new Date(obj.date * 1000) + ', and today is ' + new Date(exports.flights.date * 1000) + '!');
                    return false;
                }

            }
        };

        exports.getDate = function(timestamp) {
            var date = new Date(timestamp * 1000);
            var dayOfMonth = date.getDate();

            return dayOfMonth;
        };

        exports.removeFlight = function(index, removeFrom) {
            removeFrom.splice(index, 1);
        };

        exports.getFlights = function(params) {
            var deferred = $q.defer();
            return $http.get('app/json/flights.json')
                .success(function(data) {
                    exports.flights = data;
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        return exports;
    }]);


/**
 * Factory: FlightFactory
 * One flight details
 */
angular.module('RyanairApp')
    .factory('FlightFactory', ['$q', '$http', '$routeParams', '$location', function FlightFactory($q, $http, $routeParams, $location) {
        'use strict';
        var exports = {};
        exports.flight = {};

        exports.changeView = function(view) {
            $location.path(view); // path, not hash
        };

        exports.getFlight = function(params) {
            if (params.id) {
                var deferred = $q.defer();
                $http.get('app/json/flight/flightID' + params.id + '.json')
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        };

        return exports;
    }]);
