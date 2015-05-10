/**
 * Directive: Map <minimap></minimap>
 */
angular.module('RyanairApp')
    .directive('minimap', ['AirportsFactory', function InboxDrctv(AirportsFactory) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            templateUrl: "app/directives/minimap.tmpl.html",
            controllerAs: 'minimap',

            controller: function() {

            },

            link: function(scope, element, attrs, ctrl) {}
        }
    }]);

