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











/**
 * Directive: Inbox <inbox></inbox>
 */
angular.module('RyanairApp')
    .directive('inbox', ['InboxFactory', function InboxDrctv(InboxFactory) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            templateUrl: "app/directives/inbox.tmpl.html",
            controllerAs: 'viewInbox',

            controller: function() {
                this.inboxMessages = {};

                InboxFactory.getMessages()
                    .then(angular.bind(this, function then() {
                        this.inboxMessages = InboxFactory.messages;
                    }));

                console.warn('this.inboxMessages InboxDirective: ', this);

                this.goToMessage = function(id) {
                    InboxFactory.goToMessage(id);
                };

                this.deleteMessage = function(id, index) {
                    InboxFactory.deleteMessage(id, index);
                };

            },

            link: function(scope, element, attrs, ctrl) {
                /* 
                  by convention we do not $ prefix arguments to the link function
                  this is to be explicit that they have a fixed order
                */
            }
        }
    }]);



/**
 * Directive: Email <email></email>
 */
angular.module('RyanairApp')
    .directive('email', ['$timeout', 'EmailFactory', '$routeParams', function EmailDrctv($timeout, EmailFactory, $routeParams) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: "app/directives/email.tmpl.html",
            controllerAs: 'email',

            controller: function() {
                this.message = {};

                this.reply = function(message) {
                    EmailFactory.reply(message);
                };

                var getmessage = EmailFactory.getMessage($routeParams);

                if (getmessage) {
                    getmessage.then(angular.bind(this, function(response) {
                        EmailFactory.message = response;
                        this.message = EmailFactory.message;
                        // $scope.$parent.email.title = this.message.subject;
                    }));
                }

                console.warn('Email directive / Page: ', this);
            },

            link: function(scope, element, attrs, ctrl) {
                var textarea = element.find('.email__response-text')[0];
                scope.$watch('reply', function(newVal, oldVal) {
                    if (newVal === oldVal) return;
                    if (newVal) {
                        $timeout(function() {
                            textarea.focus();
                        }, 0);
                    }
                })
            }
        }
    }]);


/**
 * Directive: Roadmap <roadmap></roadmap>
 */
angular.module('RyanairApp')
    .directive('roadmap', ['FlightsFactory', function RoadmapDrctv(FlightsFactory) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            templateUrl: "app/directives/roadmap.tmpl.html",
            controllerAs: 'roadmap',

            controller: function() {
                this.flights = {};
                this.dayHours = 24;
                this.setHour = 0;
                this.setMinutes = 0;
                this.setAllMinutes = 0;
                this.leftOffset = 0;

                console.warn('this roadmap directive: ', this);

                FlightsFactory.getFlights()
                    .then(angular.bind(this, function then() {
                        this.flights = FlightsFactory.flights;
                    }));

                this.goToFlight = function(id) {
                    FlightsFactory.goToFlight(id);
                };

                this.setFlightToHour = function(timestamp) {
                    var date = new Date(timestamp * 1000);
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var seconds = date.getSeconds();
                    var onlyMinutes = hours * 60 + minutes;

                    this.setHour = hours;
                    this.setMinutes = minutes;
                    this.setAllMinutes = onlyMinutes;

                    this.leftOffset = parseFloat(((100 * this.setAllMinutes) / (this.dayHours * 60))).toFixed(5);

                    // console.warn( angular.element(document.querySelector('#gotohour' + this.setHour)).offset().left )

                    // var formattedTime = hours + ':' + minutes.substr(minutes.length - 2) + ':' + seconds.substr(seconds.length - 2);
                    // console.log('####date: ', date, ' ####hours: ', hours, ' ####minutes: ', minutes, '####setAllMinutes: ', this.setAllMinutes, ' ####seconds: ', seconds, ' #####this.leftOffset: ', this.leftOffset, this);

                    return {
                        // left: angular.element(document.querySelector('#gotohour' + (this.setHour === 0 ? 24 : this.setHour))).offset().left + 'px'
                        left: this.leftOffset + '%'
                    }
                };

            },

            link: function(scope, element, attrs, ctrl) {
                // console.warn(element);

                /* 
                  by convention we do not $ prefix arguments to the link function
                  this is to be explicit that they have a fixed order
                */
            }
        }
    }]);


/**
 * Directive: Timespan <timespan></timespan>
 */
angular.module('RyanairApp')
    .directive('timespan', function TimespanDrctv() {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            templateUrl: "app/directives/timespan.tmpl.html",
            controllerAs: 'timespan',

            controller: function() {
                this.hours = 24;
                this.date = new Date();
                this.dayOfWeek = this.date.getDay();
                this.currentHour = this.date.getHours();
                this.timespanWidth = parseFloat(100 / this.hours).toFixed(5);

                console.warn('timespan directive : ', this);
            },

            link: function(scope, element, attrs, ctrl) {}
        }
    });


/**
 * Directive: Nrmess <nrmess></nrmess>
 */
angular.module('RyanairApp')
    .directive('nrmess', ['InboxFactory', function NrmessDrctv(InboxFactory) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            templateUrl: "app/directives/nrmessages.tmpl.html",
            controllerAs: 'nrmessages',

            controller: function() {
                this.unreadMessages = {};

                InboxFactory.getUnreadMessages()
                    .then(angular.bind(this, function then() {

                        angular.forEach(InboxFactory.unreadMessages, function(value, key) {
                            if (!angular.isUndefined(InboxFactory.unreadMessages[key].unread) && !InboxFactory.unreadMessages[key].unread) {
                                // keep only unread messages
                                InboxFactory.unreadMessages.splice(key, 1);
                            }
                        });

                        this.unreadMessages = InboxFactory.unreadMessages;
                    }));

                console.warn('this.unreadMessages Nr: ', this);

            },

            link: function(scope, element, attrs, ctrl) {}
        }
    }]);


/**
 * Directive: Notifications <nrnotif></nrnotif>
 */
angular.module('RyanairApp')
    .directive('nrnotif', ['InboxFactory', function NrnotifDrctv(InboxFactory) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            templateUrl: "app/directives/nrnotif.tmpl.html",
            controllerAs: 'nrnotif',

            controller: function() {
                this.notifications = {};

                InboxFactory.getNotifications()
                    .then(angular.bind(this, function then() {
                        this.notifications = InboxFactory.notifications;
                    }));

                console.warn('this.nrnotif Nr : ', this);

            },

            link: function(scope, element, attrs, ctrl) {}
        }
    }]);


/**
 * Directive: Notification <notification></notification>
 */
angular.module('RyanairApp')
    .directive('notification', ['InboxFactory', function NotificationDrctv(InboxFactory) {
        'use strict';

        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            templateUrl: "app/directives/notification.tpl.html",
            controllerAs: 'notificationPage',

            controller: function() {
                this.notification = {};

                InboxFactory.getNotifications()
                    .then(angular.bind(this, function then() {
                        this.notification = InboxFactory.notifications;
                    }));

                console.warn('this.notification page: ', this);

            },

            link: function(scope, element, attrs, ctrl) {}
        }
    }]);


/**
 * Filter: Gets an object property as a number, and returns an array
 */
angular.module('RyanairApp')
    .filter('getArrayFilter', function() {
        'use strict';

        return function(input, total, preselected_length) {
            // console.log(input, total, preselected_length);
            total = ((typeof preselected_length === 'number') ? parseInt(preselected_length) : parseInt(total));
            for (var i = 0; i < total; i++) {
                input.push(i);
            }
            // console.log(input);
            return input;
        };
    });
