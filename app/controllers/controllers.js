RyanairApp.controller('HomeCtrl', ['$scope', '$location',
    function($scope, $location) {
        this.title = 'Home';

        console.log(this);

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
