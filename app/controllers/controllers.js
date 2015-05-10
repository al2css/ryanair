RyanairApp.controller('MapCtrl', ['$scope', '$location', 'AirportsFactory',
    function($scope, $location, AirportsFactory) {
        this.title = 'Ryanair\'s European Destinations on Map';
        this.airports = {};

        AirportsFactory.getAirports()
            .then(angular.bind(this, function then() {
                this.airports = AirportsFactory.airports;

                for (var i = 0, len = this.airports.length; i < len; i++) {
                    createMarker(this.airports[i]);
                }
            }));

        var mapOptions = {
            zoom: 4,
            minZoom: 4,
            maxZoom: 8,
            center: new google.maps.LatLng(50.84811, 14.5909), // Central Europe
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function(info) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(info.latitude, info.longitude),
                map: map,
                title: info.name,
                animation: google.maps.Animation.DROP
            });
            marker.content = '<p class="infoWindowContent">' + info.country.name + '</p>';

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent('<h2 class="infoWindowTitle">' + marker.title + '</h2>' + marker.content);
                infoWindow.open(map, marker);
            });

        };

        $scope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
                return "current";
            } else {
                return "";
            }
        };

    }
]);


RyanairApp.controller('DestinationsCtrl', ['$scope', '$location', 'AirportsFactory',
    function($scope, $location, AirportsFactory) {
        this.title = 'Ryanair\'s European Destinations';
        this.airports = {};
        $scope.selected = {};

        AirportsFactory.getAirports()
            .then(angular.bind(this, function then() {
                this.airports = AirportsFactory.airports;
            }));

        $scope.openInfoWindow = function(e, selectedMarker) {
            e.preventDefault();
            $scope.selected = selectedMarker;

            var mapOptions = {
                zoom: 6,
                minZoom: 5,
                maxZoom: 8,
                center: new google.maps.LatLng($scope.selected.latitude, $scope.selected.longitude),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };
            var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
            var infoWindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($scope.selected.latitude, $scope.selected.longitude),
                map: map,
                title: $scope.selected.name,
                animation: google.maps.Animation.DROP
            });
            marker.content = '<p class="infoWindowContent">' + $scope.selected.country.name + '</p>';

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent('<h2 class="infoWindowTitle">' + marker.title + '</h2>' + marker.content);
                infoWindow.open(map, marker);
            });

        };

        $scope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
                return "current";
            } else {
                return "";
            }
        };

    }
]);

