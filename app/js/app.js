/*document.addEventListener("deviceready", function(){
    console.log("Launch App techForum - deviceReady");
    navigator.splashscreen.hide();
}, false);*/

var app = angular.module('app', ['ionic','ngResource','techForum.filters'/*,'google-maps'*/])

app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "views/layouts/tabs.html"
            })
            .state('tab.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'views/partials/home.html',
                        controller: 'HomeController'
                    }
                }
            })
            .state('tab.agenda', {
                url: '/agenda',
                views: {
                    'agenda-tab': {
                        templateUrl: 'views/partials/agenda.html',
                        controller: 'AgendaController'
                    }
                }
            })
            .state('tab.conferences', {
                url: '/conferences',
                views: {
                    'conferences-tab': {
                        templateUrl: 'views/partials/conferences.html',
                        controller: 'ConferencesController'
                    }
                }
            })
            .state('tab.conference-detail', {
                url: '/conference/:conferenceId',
                views: {
                    'conferences-tab': {
                        templateUrl: 'views/partials/detail_conference.html',
                        controller: 'DetailConferenceController'
                    }
                }
            })
            .state('tab.access', {
                url: '/access',
                views: {
                    'access-tab': {
                        templateUrl: 'views/partials/access_map.html',
                        controller: 'AccessController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/tab/home');
    });