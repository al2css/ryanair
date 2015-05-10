var RyanairApp = angular.module('RyanairApp', ['ngRoute', 'ngTouch', 'ngSanitize']);

RyanairApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/map', {
                controller: 'MapCtrl',
                templateUrl: 'app/partials/_map.html',
                controllerAs: 'map'
            })
            .otherwise({
                redirectTo: '/map'
            });
    }
]);
