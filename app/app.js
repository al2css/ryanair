var RyanairApp = angular.module('RyanairApp', ['ngRoute', 'ngTouch', 'ngSanitize']);

RyanairApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/destinations', {
                controller: 'DestinationsCtrl',
                templateUrl: 'app/partials/_destinations.html',
                controllerAs: 'destinations'
            })
            .when('/map', {
                controller: 'MapCtrl',
                templateUrl: 'app/partials/_map.html',
                controllerAs: 'map'
            })
            .otherwise({
                redirectTo: '/destinations'
            });
    }
]);
