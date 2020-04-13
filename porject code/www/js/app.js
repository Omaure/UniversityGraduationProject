// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ngStorage', 'ngCordova', 'ionic-timepicker'])

    .factory ("StorageService", function ($localStorage) {
    var _getAll = function () {
        return $localStorage.things;
    };
    var _add = function (thing) {
        $localStorage.things.push(thing);
    }
    var _remove = function (thing) {
        $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
    }
    return {
        getAll: _getAll,
        add: _add,
        remove: _remove
    };
})


.run(function($rootScope) {
    $rootScope.foodChosen = null;
    $rootScope.foodPic = null;
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            }
            , 'fabContent': {
                //  template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    //    $timeout(function () {
                    ///       document.getElementById('fab-activity').classList.toggle('on');
                    //   }, 200);
                }
            }
        }

    })


    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

        .state('app.gallery', {
            url: '/gallery',
            views: {
                'menuContent': {
                    templateUrl: 'templates/gallery.html',
                    controller: 'GalleryCtrl'
                },
                'fabContent': {
                    //template: '<button id="fab-gallery" ng-click="swap()" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-arrow-swap"></i></button>',
                    /*controller: function ($timeout) {
                     $timeout(function () {
                     document.getElementById('fab-gallery').classList.toggle('on');
                     swap = function () {
                     console.log("fwfwf");
                     };
                     }, 600);
                     }*/
                }
            }
        })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })



    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ui-sref="app.activity" class="button button-fab button-fab-bottom-left button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })



    .state('app.food', {
        url: '/food',
        views: {
            'menuContent': {
                templateUrl: 'templates/food.html',
                controller: 'FoodCtrl'
            },
            'fabContent': {
                controller: function ($timeout) {

                }
            }
        }
    })


    .state('app.food2', {
        url: '/food2',
        views: {
            'menuContent': {
                templateUrl: 'templates/food2.html',
                controller: 'FoodCtrl2'
            },
            'fabContent': {
                controller: function ($timeout) {

                }
            }
        }
    })


    .state('app.statistics', {
        url: '/statistics',
        views: {
            'menuContent': {
                templateUrl: 'templates/statistics.html',
                controller: 'statisticsCtrl'
            },
            'fabContent': {
                controller: function ($timeout) {
// ionicMaterialMotion.fadeSlideIn();
                }
            }
        }
    })

    .state('app.custom', {
        url: '/custom',
        views: {
            'menuContent': {
                templateUrl: 'templates/custom.html',
                controller: 'CustomCtrl'
            },
            'fabContent': {
                controller: function ($timeout) {
// ionicMaterialMotion.fadeSlideIn();
                }
            }
        }
    })


        .state('app.medicine', {
            url: '/medicine',
            views: {
                'menuContent': {
                    templateUrl: 'templates/medicine.html',
                    controller: 'MedicineCtrl'
                },
                'fabContent': {
                    template: '<button ng-controller="MedicineCtrl" ng-click="Add()" id="fab-med" class="button button-fab button-fab-bottom-left button-energized-900"><i  class="icon ion-plus"></i></button>',

                    controller: function ($timeout) {
                        /*$timeout(function () {
                         document.getElementById('fab-med').classList.toggle('on');
                         }, 800);*/
                    }
                }
            }
        })



    // if none of the above states are matched, use this as the fallback
    var hasdata = window.localStorage.getItem("uAge");
    if(hasdata == null || hasdata =="")
        $urlRouterProvider.otherwise('/app/login');
    else
        $urlRouterProvider.otherwise('/app/profile');


});
