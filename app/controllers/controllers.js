RyanairApp.controller('MapCtrl', ['$scope', '$filter', 'AirportsFactory',
    function($scope, $filter, AirportsFactory) {
        this.title = 'Ryanair\'s European Destinations on Map';
        $scope.airports = {};

        // get data from factory
        AirportsFactory.getAirports()
            .then(angular.bind(this, function then() {
                $scope.airports = AirportsFactory.airports;
				$scope.copyAirports = $scope.airports;

				initializeMap();

				$scope.$watch('map.search', function(val) { 
				    $scope.airports = $filter('filter')($scope.copyAirports, val);
				    
				    clearMarkers();
				    
				    for (var i = 0, len = $scope.airports.length; i < len; i++) {
				        addMarker($scope.airports[i]);
				    }

				    // console.log('val: ', val);
				    // console.log('$scope.airports: ', $scope.airports);
				});

            }));

        // console.warn('$scope: ', $scope);

    }
]);
