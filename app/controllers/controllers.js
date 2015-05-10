RyanairApp.controller('MapCtrl', ['$scope', '$location', 'AirportsFactory',
    function($scope, $location, AirportsFactory) {
        // this.title = 'Ryanair\'s European destinations on Map';
        this.title = 'Destinations on Map';
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
            center: new google.maps.LatLng(48.085417915489565, 18.6328125),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function(info) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(info.latitude, info.longitude),
                map: map,
                title: info.name
            });
            marker.content = '<div class="infoWindowContent">' + info.country.name + '</div>';

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open(map, marker);
            });

        };

        $scope.openInfoWindow = function(e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
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
        // this.title = 'Ryanair\'s European destinations';
        this.title = 'Destinations';
        this.airports = {};
        this.countries = {};

        AirportsFactory.getAirports()
            .then(angular.bind(this, function then() {
                this.airports = AirportsFactory.airports;
            }));

        AirportsFactory.getCountries()
            .then(angular.bind(this, function then() {
                this.countries = AirportsFactory.countries;
            }));

        $scope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
                return "current";
            } else {
                return "";
            }
        };

    }
]);








// WeightBalanceApp.controller('FlightCtrl', ['$scope', '$location', '$routeParams', 'FlightFactory',
//     function($scope, $location, $routeParams, FlightFactory) {
//         this.title = 'This flight page';
//         this.reqFlight = {};

//         console.log(" this: ", this);

//         var getFlight = FlightFactory.getFlight($routeParams);
//         if (getFlight) {
//             getFlight.then(angular.bind(this, function(response) {
//                 FlightFactory.reqFlight = response;
//                 this.reqFlight = FlightFactory.reqFlight;
//                 // $scope.$parent.email.title = this.message.subject;
//             }));
//         }

//     }
// ]);

// WeightBalanceApp.controller('FlightsCtrl', ['$scope', '$location', 'FlightsFactory',
//     function($scope, $location, FlightsFactory) {
//         this.title = 'Flights page!';
//         this.flights = {};

//         console.log(' this: ', this);

//         FlightsFactory.getFlights()
//             .then(angular.bind(this, function then() {
//                 this.flights = FlightsFactory.flights;
//             }));

//         $scope.goToFlight = function(id) {
//             FlightsFactory.goToFlight(id);
//         };

//         $scope.addToMyFlights = function(obj, index, type) {
//             var myFlight = obj;
//             var flightParent = type;
//             FlightsFactory.addToMyFlights(myFlight, index, flightParent);
//         };

//         $scope.getClass = function(path) {
//             if ($location.path().substr(0, path.length) == path) {
//                 return "current";
//             } else {
//                 return "";
//             }
//         };

//     }
// ]);

// WeightBalanceApp.controller('InboxCtrl', ['$scope', '$location', 'InboxFactory', 
//     function($scope, $location, InboxFactory) {
//         this.title = 'Inbox';
//         this.messages = {};

//         console.log(this);

//         $scope.getClass = function(path) {
//             if ($location.path().substr(0, path.length) == path) {
//                 return "current";
//             } else {
//                 return "";
//             }
//         };

//     }
// ]);


// WeightBalanceApp.controller('EmailCtrl', ['$scope', '$location', 'InboxFactory', 
//     function($scope, $location, InboxFactory) {
//         this.title = 'Email read';
//         this.email = {};

//         console.log(this);

//         $scope.getClass = function(path) {
//             if ($location.path().substr(0, path.length) == path) {
//                 return "current";
//             } else {
//                 return "";
//             }
//         };

//     }
// ]);


// WeightBalanceApp.controller('NotificationsCtrl', ['$scope', '$location',
//     function($scope, $location) {
//         this.title = 'Notifications';
//         this.notifications = {};

//         console.log(this);

//         $scope.getClass = function(path) {
//             if ($location.path().substr(0, path.length) == path) {
//                 return "current";
//             } else {
//                 return "";
//             }
//         };

//     }
// ]);
