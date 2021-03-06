/**
 * Cordova event
 */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    navigator.splashscreen.hide();
}
/**
 * Modules declaration
 */
var app = angular.module('app', ['ionic','ngResource','techForum.filters','google-maps']);

/**
 * Constant ionic
 */
app.constant('$ionicLoadingConfig', {
    template: '<div>Loading conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>'
});

/**
 * Route configuration
 */
app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            /** Tab **/
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "views/layouts/tabs.html"
            })
            /** Tab Home **/
            .state('tab.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'views/partials/home.html',
                        controller: 'HomeController'
                    }
                }
            })
            /** Tab Conference **/
            .state('tab.conferences', {
                url: '/conferences',
                views: {
                    'conferences-tab': {
                        templateUrl: 'views/partials/conferences.html',
                        controller: 'ConferencesController'
                    }
                }
            })
            /** Tab detail conference **/
            .state('tab.conference-detail', {
                url: '/conference/:conferenceId',
                views: {
                    'conferences-tab': {
                        templateUrl: 'views/partials/detail_conference.html',
                        controller: 'DetailConferenceController'
                    }
                }
            })
            /** Tab Agenda **/
            .state('tab.agenda', {
                url: '/agenda',
                views: {
                    'agenda-tab': {
                        templateUrl: 'views/partials/agenda.html',
                        controller: 'AgendaController'
                    }
                }
            })
            /** Tab Agenda - View conference by day and shedule to add in agenda **/
            .state('tab.agenda-conference-schedule', {
                url: '/agenda/conferences/:day/:schedule',
                views: {
                    'agenda-tab': {
                        templateUrl: 'views/partials/conference_by_schedule.html',
                        controller: 'ConferencesByScheduleController'
                    }
                }
            })
            /** Tab Agenda - detail conference in Agenda **/
            .state('tab.conference-detail-agenda', {
                url: '/conference-agenda/:conferenceId',
                views: {
                    'agenda-tab': {
                        templateUrl: 'views/partials/detail_conference.html',
                        controller: 'DetailConferenceController'
                    }
                }
            })
            /** Tab Access Map **/
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
    }]
);