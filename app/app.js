var RyanairApp = angular.module('RyanairApp', ['ngRoute', 'ngTouch', 'ngSanitize', 'ui.bootstrap']);

RyanairApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                controller: 'HomeCtrl',
                templateUrl: 'app/partials/_home.html',
                controllerAs: 'home'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
]);
