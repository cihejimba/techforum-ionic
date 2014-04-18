/**
 * Cordova event
 */
document.addEventListener("deviceready", function(){
    console.log("Cordova - Launch App techForum - deviceReady");
    navigator.splashscreen.hide();
}, false);
/**
 * Ionic event
 */
ionic.Platform.ready(function(){
    console.log("Ionic - Launch App techForum - deviceReady");
});

/**
 * Modules declaration
 */
var app = angular.module('app', ['ionic','ngResource','techForum.filters','google-maps']);

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
    }]);
/**
 * Access Controller
 */
angular.module('app')
    .controller('AccessController', ['$scope', function($scope)
    {
        console.log('--- AccessController ---');
        $scope.fromLilleFlandre = false;
        $scope.fromlesquin = false;

        /** display route to WorldLine by from **/
        $scope.displayFrom = function(from){
            if(from == 'lille'){
                var a = $scope.fromLilleFlandre ? $scope.fromLilleFlandre = false : $scope.fromLilleFlandre = true;
            }else if(from == 'lesquin'){
                var b = $scope.fromlesquin ? $scope.fromlesquin = false : $scope.fromlesquin =true;
            }else
                alert("Impossible to display From "+from);
        };

        /** Default Worldline Seclin GPS **/
        $scope.worldlineGPS ={
            latitude: 50.567593,
            longitude: 3.029413
        };

        /** Configuration Map **/
        $scope.map = {
            center: {
                latitude: $scope.worldlineGPS.latitude,
                longitude: $scope.worldlineGPS.longitude
            },
            markerWorldline: {
                "latitude": $scope.worldlineGPS.latitude,
                "longitude": $scope.worldlineGPS.longitude,
                "showWindow":true,
                "title":"Worldine"
            },
            markerYou: {
                "latitude": $scope.worldlineGPS.latitude,
                "longitude": $scope.worldlineGPS.longitude,
                "showWindow":true,
                "title":"Your Position"
            },
            zoom: 14
        };

        /** WorldLine Localisation **/
        $scope.locateWorldline = function(){
            $scope.map.center.latitude = $scope.worldlineGPS.latitude;
            $scope.map.center.longitude = $scope.worldlineGPS.longitude;
        };

        /** User Geolocalisation **/
        $scope.getMyposition = function(){
            navigator.geolocation.getCurrentPosition(
                function(position){
                    $scope.$apply(function(){
                        $scope.map.markerYou.latitude = position.coords.latitude;
                        $scope.map.markerYou.longitude = position.coords.longitude;
                        $scope.map.center.latitude = position.coords.latitude;
                        $scope.map.center.longitude = position.coords.longitude;
                    });
                },function(error){
                    $scope.positioninfo = error;
                }
            );
        };
    }]);
/**
 * Agenda Controller
 */
angular.module('app')
    .controller('AgendaController', ['$scope','ConferencesService','$state','$ionicPopup', function($scope,ConferencesService,$state,$ionicPopup)
    {
        console.log('--- AgendaController ---');

        var conferencesInAgenda = [];
        var agenda = null;
        $scope.myAgenda = [];

        $scope.day = {
            day1 : 1,
            day2 : 2
        };

        var getSchedule = function(conferences){
            $scope.mySchedule1 = ConferencesService.sortConferenceByStartByDay(conferences,$scope.day.day1);
            $scope.mySchedule2 = ConferencesService.sortConferenceByStartByDay(conferences,$scope.day.day2);
        };

        $scope.getAgendaAndConference = function(){
            /** Retrieve schedule conference **/
            var conferences = [];
            if (localStorage.getItem('conferences') === null){
                ConferencesService.getConferencesResource().query(
                    function (data) {
                        conferences = data;
                        localStorage.setItem('conferences', JSON.stringify(conferences));
                        getSchedule(data);
                    },
                    function(reason){
                    }
                );
            }else{
                conferences = JSON.parse(localStorage.getItem('conferences'));
                getSchedule(conferences);
            }
            if(localStorage.getItem('myAgenda') !== null) {
                agenda = JSON.parse(localStorage.getItem('myAgenda'));
                angular.forEach(conferences, function (value, key) {
                    if(agenda.indexOf(value._id+"") != -1){
                        conferencesInAgenda.push(value);
                    }
                });
                getSchedule(conferences);
                $scope.myAgenda = conferencesInAgenda;
            }
        };

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail',{conferenceId: idConference});
        };

        /** View conference for time in agenda **/
        $scope.viewConferenceWithTime = function(day,schedule){
            $state.go('tab.agenda-conference-schedule',{day: day,schedule:schedule});
        };

        /** Delete a conference in agenda **/
        $scope.onItemDelete = function(idConferenceToDelete) {

            $ionicPopup.confirm({
                title: 'Delete conference',
                content: 'Do you want delete this conference on your agenda ?'
            }).then(function(res) {
                if(res) {
                    if (localStorage.getItem('myAgenda') !== null) {
                        agenda = JSON.parse(localStorage.getItem('myAgenda'));
                        var itemAgenda = agenda.indexOf(idConferenceToDelete + "");
                        if (itemAgenda != -1) {
                            agenda.splice(itemAgenda, 1);
                            localStorage.setItem('myAgenda', JSON.stringify(agenda));
                        }
                        for (i = 0; i < $scope.myAgenda.length; i++) {
                            if ($scope.myAgenda[i]._id == idConferenceToDelete)
                                $scope.myAgenda.splice(i, 1);
                        }
                    } else
                        alert("Error - please can reload application");
                }
            });
        };
    }]);
/**
 * ConferencesBySchedule Controller
 */
angular.module('app')
    .controller('ConferencesByScheduleController', ['$scope','$stateParams','ConferencesService','$state', function($scope,$stateParams,ConferencesService,$state)
    {
        console.log('--- ConferencesByScheduleController ---');
        $scope.day = $stateParams.day;
        $scope.schedule = $stateParams.schedule;

        /** Return to Agenda **/
        $scope.backAgenda =function(){
            $state.go('tab.agenda');
        };

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail-agenda',{conferenceId: idConference});
        };

        if (localStorage.getItem('conferences') === null) {
            ConferencesService.getConferencesResource().query(
                function (data) {
                    $scope.conferences = data;
                    $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                },
                function (reason) {
                    alert('Unable to retrieve conferences list');
                }
            );

        } else {
            $scope.conferences = JSON.parse(localStorage.getItem('conferences'));
            $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
        }

    }]);
/**
 * Conference Controller
 */
angular.module('app')
    .controller('ConferencesController', ['$scope','ConferencesService','$ionicLoading','$state','$ionicPopup', function($scope,ConferencesService,$ionicLoading,$state,$ionicPopup)
    {
        console.log('--- ConferencesController ---');

        $scope.conferences = [];
        $scope.scheduleconferences = [];
        $scope.numButton = 1;
        $scope.selectedConferenceId = -1;

        /** Retrieve all conference for to display in conference list
         * Is not conference in localStorage = retrieve by internet and display a loading
         * Else display conference in localStorage
         * **/
        $scope.getAllConf = function(){
            if (localStorage.getItem('conferences') === null) {
                $scope.loading = $ionicLoading.show({
                    content: '<div>Loading conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                ConferencesService.getLocalConferences().query(
                    function(data){
                        $scope.conferences = data;
                        $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                        localStorage.setItem('conferences', JSON.stringify(data));
                        $scope.loading.hide();
                    },
                    function(reason){
                        alert('Unable to retrieve conferences list');
                        $scope.loading.hide();
                    }
                );
            } else {
                $scope.conferences = JSON.parse(localStorage.getItem('conferences'));
                $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
            }
         };

        /** Update conference list by Internet **/
        $scope.updateConference = function(){

           $scope.loading = $ionicLoading.show({
               content: '<div>Update conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>',
               animation: 'fade-in',
               showBackdrop: true,
               maxWidth: 200,
               showDelay: 0
           });

            ConferencesService.getOnlineConference().query(
                function(confOnline){
                    if(!ConferencesService.checkSameConferences($scope.conferences,confOnline)){
                        $scope.conferences = confOnline;
                        ConferencesService.setConferencesResource(confOnline);
                        localStorage.setItem('conferences', JSON.stringify(confOnline));
                        $scope.loading.hide();
                        $ionicPopup.alert({
                            title: 'Update conference',
                            content: 'You have correctly update conference list'
                        });
                    }else{
                        $scope.loading.hide();
                        $ionicPopup.alert({
                            title: 'Update conference',
                            content: 'You have already a last conference list'
                        });
                    }
                },
                function(reason){
                    $scope.loading.hide();
                    return -1;
                }
            );
        };

        /** Display a conference resume in a conference list **/
        $scope.DisplayConference = function(conference){
            if($scope.selectedConferenceId == conference._id)
                $scope.selectedConferenceId = -1;
            else
                $scope.selectedConferenceId = conference._id;
        };

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
                $state.go('tab.conference-detail',{conferenceId: idConference});
        };
    }]);
/**
 * DetailConference Controller
 */
angular.module('app')
    .controller('DetailConferenceController', ['$scope','$stateParams','ConferencesService','MessagesService','$ionicNavBarDelegate','AgendaService','$ionicPopup', function($scope,$stateParams,ConferencesService,MessagesService,$ionicNavBarDelegate,AgendaService,$ionicPopup)
    {
        console.log('--- DetailConferenceController ---');

        var idConference = $stateParams.conferenceId;
        var conferences = [];
        $scope.comments = [];
        $scope.conference = [];
        $scope.loadingComment = "loading...";
        $scope.showHideComment = 'show';
        $scope.newComment = {
            name : null,
            msg : null
        };

        /** Display conference description **/
        $scope.displayDescription = function(){
            if($scope.showHideComment == 'show'){
                $scope.showHideComment = 'hide';
            }else
                $scope.showHideComment = 'show';
        };

        /** Retrieve conference by id with $stateParam and display detail conference **/
        $scope.getConference = function(){
            ConferencesService.getLocalConferences().query(function(data){
                conferences = data;
                angular.forEach(data,function(conference , key) {
                    if (conference._id == idConference) {
                        getComments();
                        $scope.conference = conference;
                    }
                });
            },function(reason){
                alert('Enable to retrieve a conference with id '+idConference);
            });
        };

        /** Post a comment on server for conference with id : idConference **/
        $scope.postComment = function(idConference){

            var commentR = MessagesService.getOnlineMsgComment();
            var comment = new commentR();
            comment.name = $scope.newComment.name;
            comment.msg = $scope.newComment.msg;
            comment.type = "comment";
            comment.date = new Date();
            comment.idConference = idConference;

            comment.$save(
                function(data, getResponseHeadersSuccess){
                    $ionicPopup.alert({
                        title: 'Send comment',
                        content: 'Your comment has been sent correctly.'
                    }).then(function(res) {
                        getComments();
                    });

                },
                function(data,getResponseHeadersError){
                    $ionicPopup.alert({
                        title: 'Send comment',
                        content: 'Impossible to send your comment'
                    });
                }
            );

            $scope.newComment.name = null;
            $scope.newComment.msg = null;

        };

        /** retrieve all comment for conference **/
        var getComments = function(){
            MessagesService.getOnlineMsgCommentByIdConference(idConference).query(
                function(data){
                    $scope.comments = data;
                    $scope.loadingComment = "";
                },function(reason){
                    $scope.loadingComment = "";
                }
            );
        };

        /** Return to conference list **/
        $scope.back =function(){
            $ionicNavBarDelegate.back();
        };

        /** Add a conference in agenda **/
        $scope.addAgenda = function(id){

            if(localStorage.getItem("myAgenda") === null)
                AgendaService.addToAgenda(id);
            else{
                if(AgendaService.checkSameScheduleConferenceInAgenda(id,conferences) === false)
                    AgendaService.addToAgenda(id);
                else{
                    $ionicPopup.alert({
                        title: 'Impossible',
                        content: 'One conference already to add with the same to start'
                    });
                }
            }
        };
    }]);
/**
 * Home Controller
 */
angular.module('app')
    .controller('HomeController', ['$scope','DateService','ConferencesService','$state', function($scope,DateService,ConferencesService,$state)
    {

        console.log('--- HomeController ---');

        var day1 = new Date(2014,5,03);
        var day2 = new Date(2014,5,04);
        var today = new Date();
        var todayShort = new Date(today.getFullYear(),today.getMonth(),today.getDate());

        $scope.current_day = {
            day : 2
        };
        $scope.scheduleConferences = [];
        $scope.nextSchedule = null;
        $scope.time = DateService.dateDiff(today,day1);

        /** Check a actual day **/
        if(DateService.compare(day1,todayShort) === 0 ){
            $scope.current_day.day = 1;
        }else if(DateService.compare(day2,todayShort) === 0 ){
            $scope.current_day.day = 2;
        }else
            $scope.current_day.day = 0;

        /** Retrieve a conference in function of day and schedule to display a next conference **/
        $scope.getConf = function(){
            if (localStorage.getItem('conferences') === null) {
                ConferencesService.getLocalConferences().query(
                    function(data){
                        $scope.conferences = data;
                        $scope.scheduleConferences = ConferencesService.sortConferenceByStartByDay(data,$scope.current_day.day);
                        $scope.nextSchedule = DateService.nextSchedule($scope.scheduleConferences,today);
                        localStorage.setItem('conferences', JSON.stringify(data));
                    },
                    function(reason){
                    }
                );
            } else {
                $scope.conferences = JSON.parse(localStorage.getItem('conferences'));
                $scope.scheduleConferences = ConferencesService.sortConferenceByStartByDay($scope.conferences,$scope.current_day.day);
                $scope.nextSchedule = DateService.nextSchedule($scope.scheduleConferences,today);
            }
        };

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail',{conferenceId: idConference});
        };
    }]);
/** module filter **/
angular.module('techForum.filters',[])

    /** sort conference by schedule and day **/
    .filter('scheduleByConference', function() {
        return function(input, schedule, day) {
            var tab = [];
            angular.forEach(input, function(value, key){
                if(value.when.start == schedule && value.day == day) {
                    tab.push(value);
                }
            });
            return tab;
        };
    });

/**
 * Agenda Service
 */
app.factory('AgendaService',['$ionicPopup', function($ionicPopup) {

    var agendaFactory = {

        /** add conference in agenda **/
        addToAgenda : function (idConference){

            var agenda = [];
            var alreadyExist = false;

            if(localStorage.getItem('myAgenda') === null){
                $ionicPopup.confirm({
                    title: 'Add conference',
                    content: 'Do you want add this conference on your agenda ?'
                }).then(function(res) {
                    if(res) {
                        agenda = [];
                        agenda.push(idConference);
                        localStorage.setItem('myAgenda',JSON.stringify(agenda));
                    }
                });
            }else{
                agenda = JSON.parse(localStorage.getItem('myAgenda'));
                angular.forEach(agenda, function(value,key){
                    if(value == idConference){
                        $ionicPopup.alert({
                            title: 'Impossible',
                            content: 'You are already to add this conference'
                        });
                        alreadyExist = true;
                    }
                });
                if(alreadyExist === false){
                    $ionicPopup.confirm({
                        title: 'Add conference',
                        content: 'Do you want add this conference on your agenda ?'
                    }).then(function(res) {
                        if(res) {
                            agenda.push(idConference);
                            localStorage.setItem('myAgenda',JSON.stringify(agenda));
                        }
                    });
                }
            }
        },
        /** check if a conference exist in the agenda with the same begin schedule in tabConference **/
        checkSameScheduleConferenceInAgenda : function(idConference,tabConferences){

            var conference = null;
            var res = false;
            var index = 0;
            var conferencesInAgenda = [];
            var agendaSearch = JSON.parse(localStorage.getItem('myAgenda'));

            // recherche des conferences
            for(i = 0 ; i < tabConferences.length; i++){
                if (tabConferences[i]._id == idConference) {
                    conference = tabConferences[i];
                }
                if(agendaSearch.indexOf(tabConferences[i]._id+"") != -1){
                    conferencesInAgenda.push(tabConferences[i]);
                }
            }
            // recherche du meme horaire
            while(res === false && index < conferencesInAgenda.length){
                if(conferencesInAgenda[index].when.start == conference.when.start){
                    console.log("Conference with the same start find !");
                    res = true;
                }
                index++;
            }
            console.log("Same schedule ? : "+res);
            return res;
        }
    };

    return agendaFactory;
}]);
/**
 * Conference Service
 */
app.factory('ConferencesService', ['$resource', function($resource) {

    var confFactory = {
        conferencesResource : [],
        scheduleConference : [],

        /** get online resource for retreive a conference list **/
        getOnlineConference : function (){
            confFactory.conferencesResource =  $resource('http://techforum-worldline.rhcloud.com//conferences/:id',{id:'@id'});
            return confFactory.conferencesResource;
        },
        /** get local resource for retreive a interne conference list (view data folder)**/
        getLocalConferences : function(){
            confFactory.conferencesResource = $resource('data/conferences.json');
            return confFactory.conferencesResource;
        },
        /** create a tab sort with start schedule conference **/
        sortConferenceByStart : function(pConference){
            var tab =[];
            angular.forEach(pConference, function(value, key){
                if(tab.indexOf(value.when.start) == -1)
                    tab.push(value.when.start);
            });
            confFactory.scheduleConference = tab.sort();
            return confFactory.scheduleConference;
        },
        /** create a tab sort with start schedule conference by day **/
        sortConferenceByStartByDay : function(pConference,day){
            var tab =[];
            if(day === 0){
                tab = [];
            }else{
                angular.forEach(pConference, function(value, key){
                    if(tab.indexOf(value.when.start) == -1 && value.day == day){
                        tab.push(value.when.start);
                    }
                });
            }
            confFactory.scheduleConference = tab.sort();
            return confFactory.scheduleConference;
        },
        /** check if two conference are equals **/
        checkSameConferences : function(pConference1,pConference2){
            return angular.equals(pConference1,pConference2);
        },
        /** getter scheduleConference **/
        getScheduleConference : function(){
          return confFactory.scheduleConference;
        },
        /** setter scheduleConference **/
        setConferencesResource : function(conferences){
            confFactory.conferencesResource = conferences;
        },
        /** getter conferencesResource **/
        getConferencesResource : function(){
            return confFactory.conferencesResource;
        },
        /** check if conferencesResource is empty **/
        conferenceResourceIsEmpty : function(){
            confFactory.getConferencesResource().query(
                function(data){
                    if(data === null)
                        return true;
                    else
                        return false;
                },function(reason){
                    return true;
                }
            );
         }
    };

    return confFactory;
}]);



/**
 * Date Service
 */
app.factory('DateService', function() {

    var dateFactory = {

        /** compare two date : 0 if date_1=date_2 , 1 if date_1>date_2 , -1 if date_1<date_2 **/
        compare : function (date_1, date_2){
            var diff = date_1.getTime()-date_2.getTime();
            return (diff===0?diff:diff/Math.abs(diff));
        },
        /** get a time between two date **/
        dateDiff : function(date1, date2){
            var diff = {};
            var tmp = date2 - date1;

            tmp = Math.floor(tmp/1000);             // second number between two date
            diff.sec = tmp % 60;                    // Extraction second number

            tmp = Math.floor((tmp-diff.sec)/60);    // minute number
            diff.min = tmp % 60;                    // Extraction minute number

            tmp = Math.floor((tmp-diff.min)/60);    // hour number
            diff.hour = tmp % 24;                   // Extraction hour number

            tmp = Math.floor((tmp-diff.hour)/24);   // day number
            diff.day = tmp;

            return diff;
        },
        /** get the earliest date a function of the start time of phone **/
        nextSchedule : function(tab,date){
            //la date la plus ancien pour avoir un grand timestamps
            var res = new Date(2014,5,5)-date;
            tab.sort();

            for(i = 0; i < tab.length;i++){
                heure = tab[i].substring(0,2);
                minute = tab[i].substring(3,5);
                var d = new Date(date.getFullYear(),date.getMonth(),date.getDate(),heure,minute);
                if(date < d){
                    if(d-date<res) {
                        res = tab[i];
                        return res;
                    }else{
                        console.log('NO d-date<res : '+d+"-"+date+"<"+res);
                    }
                }else
                    console.log(' NO date < d : '+date +" < "+d);
            }
        }
    };
    return dateFactory;
});

/**
 * Message Service
 */
app.factory('MessagesService', ['$resource', function($resource) {

    var msgFactory = {

        commentResource : [],
        /** get online comment resource by conference **/
        getOnlineMsgCommentByIdConference : function (idConference){
            var lien = 'http://techforum-worldline.rhcloud.com//messages/comments/'+idConference;
            return $resource(lien);
        },
        /** get online comment resource **/
        getOnlineMsgComment : function (){
            msgFactory.commentResource = $resource('http://techforum-worldline.rhcloud.com//messages/comments/');
            return msgFactory.commentResource;
        }
    };
    return msgFactory;
}]);

/**
 * Cordova event
 */
document.addEventListener("deviceready", function(){
    console.log("Cordova - Launch App techForum - deviceReady");
    navigator.splashscreen.hide();
}, false);
/**
 * Ionic event
 */
ionic.Platform.ready(function(){
    console.log("Ionic - Launch App techForum - deviceReady");
});

/**
 * Modules declaration
 */
var app = angular.module('app', ['ionic','ngResource','techForum.filters','google-maps']);

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
    }]);
/**
 * Access Controller
 */
angular.module('app')
    .controller('AccessController', ['$scope', function($scope)
    {
        console.log('--- AccessController ---');
        $scope.fromLilleFlandre = false;
        $scope.fromlesquin = false;

        /** display route to WorldLine by from **/
        $scope.displayFrom = function(from){
            if(from == 'lille'){
                var a = $scope.fromLilleFlandre ? $scope.fromLilleFlandre = false : $scope.fromLilleFlandre = true;
            }else if(from == 'lesquin'){
                var b = $scope.fromlesquin ? $scope.fromlesquin = false : $scope.fromlesquin =true;
            }else
                alert("Impossible to display From "+from);
        };

        /** Default Worldline Seclin GPS **/
        $scope.worldlineGPS ={
            latitude: 50.567593,
            longitude: 3.029413
        };

        /** Configuration Map **/
        $scope.map = {
            center: {
                latitude: $scope.worldlineGPS.latitude,
                longitude: $scope.worldlineGPS.longitude
            },
            markerWorldline: {
                "latitude": $scope.worldlineGPS.latitude,
                "longitude": $scope.worldlineGPS.longitude,
                "showWindow":true,
                "title":"Worldine"
            },
            markerYou: {
                "latitude": $scope.worldlineGPS.latitude,
                "longitude": $scope.worldlineGPS.longitude,
                "showWindow":true,
                "title":"Your Position"
            },
            zoom: 14
        };

        /** WorldLine Localisation **/
        $scope.locateWorldline = function(){
            $scope.map.center.latitude = $scope.worldlineGPS.latitude;
            $scope.map.center.longitude = $scope.worldlineGPS.longitude;
        };

        /** User Geolocalisation **/
        $scope.getMyposition = function(){
            navigator.geolocation.getCurrentPosition(
                function(position){
                    $scope.$apply(function(){
                        $scope.map.markerYou.latitude = position.coords.latitude;
                        $scope.map.markerYou.longitude = position.coords.longitude;
                        $scope.map.center.latitude = position.coords.latitude;
                        $scope.map.center.longitude = position.coords.longitude;
                    });
                },function(error){
                    $scope.positioninfo = error;
                }
            );
        };
    }]);
/**
 * Agenda Controller
 */
angular.module('app')
    .controller('AgendaController', ['$scope','ConferencesService','$state','$ionicPopup', function($scope,ConferencesService,$state,$ionicPopup)
    {
        console.log('--- AgendaController ---');

        var conferencesInAgenda = [];
        var agenda = null;
        $scope.myAgenda = [];

        $scope.day = {
            day1 : 1,
            day2 : 2
        };

        var getSchedule = function(conferences){
            $scope.mySchedule1 = ConferencesService.sortConferenceByStartByDay(conferences,$scope.day.day1);
            $scope.mySchedule2 = ConferencesService.sortConferenceByStartByDay(conferences,$scope.day.day2);
        };

        $scope.getAgendaAndConference = function(){
            /** Retrieve schedule conference **/
            var conferences = [];
            if (localStorage.getItem('conferences') === null){
                ConferencesService.getConferencesResource().query(
                    function (data) {
                        conferences = data;
                        localStorage.setItem('conferences', JSON.stringify(conferences));
                        getSchedule(data);
                    },
                    function(reason){
                    }
                );
            }else{
                conferences = JSON.parse(localStorage.getItem('conferences'));
                getSchedule(conferences);
            }
            if(localStorage.getItem('myAgenda') !== null) {
                agenda = JSON.parse(localStorage.getItem('myAgenda'));
                angular.forEach(conferences, function (value, key) {
                    if(agenda.indexOf(value._id+"") != -1){
                        conferencesInAgenda.push(value);
                    }
                });
                getSchedule(conferences);
                $scope.myAgenda = conferencesInAgenda;
            }
        };

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail',{conferenceId: idConference});
        };

        /** View conference for time in agenda **/
        $scope.viewConferenceWithTime = function(day,schedule){
            $state.go('tab.agenda-conference-schedule',{day: day,schedule:schedule});
        };

        /** Delete a conference in agenda **/
        $scope.onItemDelete = function(idConferenceToDelete) {

            $ionicPopup.confirm({
                title: 'Delete conference',
                content: 'Do you want delete this conference on your agenda ?'
            }).then(function(res) {
                if(res) {
                    if (localStorage.getItem('myAgenda') !== null) {
                        agenda = JSON.parse(localStorage.getItem('myAgenda'));
                        var itemAgenda = agenda.indexOf(idConferenceToDelete + "");
                        if (itemAgenda != -1) {
                            agenda.splice(itemAgenda, 1);
                            localStorage.setItem('myAgenda', JSON.stringify(agenda));
                        }
                        for (i = 0; i < $scope.myAgenda.length; i++) {
                            if ($scope.myAgenda[i]._id == idConferenceToDelete)
                                $scope.myAgenda.splice(i, 1);
                        }
                    } else
                        alert("Error - please can reload application");
                }
            });
        };
    }]);
/**
 * ConferencesBySchedule Controller
 */
angular.module('app')
    .controller('ConferencesByScheduleController', ['$scope','$stateParams','ConferencesService','$state', function($scope,$stateParams,ConferencesService,$state)
    {
        console.log('--- ConferencesByScheduleController ---');
        $scope.day = $stateParams.day;
        $scope.schedule = $stateParams.schedule;

        /** Return to Agenda **/
        $scope.backAgenda =function(){
            $state.go('tab.agenda');
        };

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail-agenda',{conferenceId: idConference});
        };

        if (localStorage.getItem('conferences') === null) {
            ConferencesService.getConferencesResource().query(
                function (data) {
                    $scope.conferences = data;
                    $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                },
                function (reason) {
                    alert('Unable to retrieve conferences list');
                }
            );

        } else {
            $scope.conferences = JSON.parse(localStorage.getItem('conferences'));
            $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
        }

    }]);
/**
 * Conference Controller
 */
angular.module('app')
    .controller('ConferencesController', ['$scope','ConferencesService','$ionicLoading','$state','$ionicPopup', function($scope,ConferencesService,$ionicLoading,$state,$ionicPopup)
    {
        console.log('--- ConferencesController ---');

        $scope.conferences = [];
        $scope.scheduleconferences = [];
        $scope.numButton = 1;
        $scope.selectedConferenceId = -1;

        /** Retrieve all conference for to display in conference list
         * Is not conference in localStorage = retrieve by internet and display a loading
         * Else display conference in localStorage
         * **/
        $scope.getAllConf = function(){
            if (localStorage.getItem('conferences') === null) {
                $scope.loading = $ionicLoading.show({
                    content: '<div>Loading conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                ConferencesService.getLocalConferences().query(
                    function(data){
                        $scope.conferences = data;
                        $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                        localStorage.setItem('conferences', JSON.stringify(data));
                        $scope.loading.hide();
                    },
                    function(reason){
                        alert('Unable to retrieve conferences list');
                        $scope.loading.hide();
                    }
                );
            } else {
                $scope.conferences = JSON.parse(localStorage.getItem('conferences'));
                $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
            }
         };

        /** Update conference list by Internet **/
        $scope.updateConference = function(){

           $scope.loading = $ionicLoading.show({
               content: '<div>Update conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>',
               animation: 'fade-in',
               showBackdrop: true,
               maxWidth: 200,
               showDelay: 0
           });

            ConferencesService.getOnlineConference().query(
                function(confOnline){
                    if(!ConferencesService.checkSameConferences($scope.conferences,confOnline)){
                        $scope.conferences = confOnline;
                        ConferencesService.setConferencesResource(confOnline);
                        localStorage.setItem('conferences', JSON.stringify(confOnline));
                        $scope.loading.hide();
                        $ionicPopup.alert({
                            title: 'Update conference',
                            content: 'You have correctly update conference list'
                        });
                    }else{
                        $scope.loading.hide();
                        $ionicPopup.alert({
                            title: 'Update conference',
                            content: 'You have already a last conference list'
                        });
                    }
                },
                function(reason){
                    $scope.loading.hide();
                    return -1;
                }
            );
        };

        /** Display a conference resume in a conference list **/
        $scope.DisplayConference = function(conference){
            if($scope.selectedConferenceId == conference._id)
                $scope.selectedConferenceId = -1;
            else
                $scope.selectedConferenceId = conference._id;
        };

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
                $state.go('tab.conference-detail',{conferenceId: idConference});
        };
    }]);
/**
 * DetailConference Controller
 */
angular.module('app')
    .controller('DetailConferenceController', ['$scope','$stateParams','ConferencesService','MessagesService','$ionicNavBarDelegate','AgendaService','$ionicPopup', function($scope,$stateParams,ConferencesService,MessagesService,$ionicNavBarDelegate,AgendaService,$ionicPopup)
    {
        console.log('--- DetailConferenceController ---');

        var idConference = $stateParams.conferenceId;
        var conferences = [];
        $scope.comments = [];
        $scope.conference = [];
        $scope.loadingComment = "loading...";
        $scope.showHideComment = 'show';
        $scope.newComment = {
            name : null,
            msg : null
        };

        /** Display conference description **/
        $scope.displayDescription = function(){
            if($scope.showHideComment == 'show'){
                $scope.showHideComment = 'hide';
            }else
                $scope.showHideComment = 'show';
        };

        /** Retrieve conference by id with $stateParam and display detail conference **/
        $scope.getConference = function(){
            ConferencesService.getLocalConferences().query(function(data){
                conferences = data;
                angular.forEach(data,function(conference , key) {
                    if (conference._id == idConference) {
                        getComments();
                        $scope.conference = conference;
                    }
                });
            },function(reason){
                alert('Enable to retrieve a conference with id '+idConference);
            });
        };

        /** Post a comment on server for conference with id : idConference **/
        $scope.postComment = function(idConference){

            var commentR = MessagesService.getOnlineMsgComment();
            var comment = new commentR();
            comment.name = $scope.newComment.name;
            comment.msg = $scope.newComment.msg;
            comment.type = "comment";
            comment.date = new Date();
            comment.idConference = idConference;

            comment.$save(
                function(data, getResponseHeadersSuccess){
                    $ionicPopup.alert({
                        title: 'Send comment',
                        content: 'Your comment has been sent correctly.'
                    }).then(function(res) {
                        getComments();
                    });

                },
                function(data,getResponseHeadersError){
                    $ionicPopup.alert({
                        title: 'Send comment',
                        content: 'Impossible to send your comment'
                    });
                }
            );

            $scope.newComment.name = null;
            $scope.newComment.msg = null;

        };

        /** retrieve all comment for conference **/
        var getComments = function(){
            MessagesService.getOnlineMsgCommentByIdConference(idConference).query(
                function(data){
                    $scope.comments = data;
                    $scope.loadingComment = "";
                },function(reason){
                    $scope.loadingComment = "";
                }
            );
        };

        /** Return to conference list **/
        $scope.back =function(){
            $ionicNavBarDelegate.back();
        };

        /** Add a conference in agenda **/
        $scope.addAgenda = function(id){

            if(localStorage.getItem("myAgenda") === null)
                AgendaService.addToAgenda(id);
            else{
                if(AgendaService.checkSameScheduleConferenceInAgenda(id,conferences) === false)
                    AgendaService.addToAgenda(id);
                else{
                    $ionicPopup.alert({
                        title: 'Impossible',
                        content: 'One conference already to add with the same to start'
                    });
                }
            }
        };
    }]);
/**
 * Home Controller
 */
angular.module('app')
    .controller('HomeController', ['$scope','DateService','ConferencesService','$state', function($scope,DateService,ConferencesService,$state)
    {

        console.log('--- HomeController ---');

        var day1 = new Date(2014,5,03);
        var day2 = new Date(2014,5,04);
        var today = new Date();
        var todayShort = new Date(today.getFullYear(),today.getMonth(),today.getDate());

        $scope.current_day = {
            day : 2
        };
        $scope.scheduleConferences = [];
        $scope.nextSchedule = null;
        $scope.time = DateService.dateDiff(today,day1);

        /** Check a actual day **/
        if(DateService.compare(day1,todayShort) === 0 ){
            $scope.current_day.day = 1;
        }else if(DateService.compare(day2,todayShort) === 0 ){
            $scope.current_day.day = 2;
        }else
            $scope.current_day.day = 0;

        /** Retrieve a conference in function of day and schedule to display a next conference **/
        $scope.getConf = function(){
            if (localStorage.getItem('conferences') === null) {
                ConferencesService.getLocalConferences().query(
                    function(data){
                        $scope.conferences = data;
                        $scope.scheduleConferences = ConferencesService.sortConferenceByStartByDay(data,$scope.current_day.day);
                        $scope.nextSchedule = DateService.nextSchedule($scope.scheduleConferences,today);
                        localStorage.setItem('conferences', JSON.stringify(data));
                    },
                    function(reason){
                    }
                );
            } else {
                $scope.conferences = JSON.parse(localStorage.getItem('conferences'));
                $scope.scheduleConferences = ConferencesService.sortConferenceByStartByDay($scope.conferences,$scope.current_day.day);
                $scope.nextSchedule = DateService.nextSchedule($scope.scheduleConferences,today);
            }
        };

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail',{conferenceId: idConference});
        };
    }]);
/** module filter **/
angular.module('techForum.filters',[])

    /** sort conference by schedule and day **/
    .filter('scheduleByConference', function() {
        return function(input, schedule, day) {
            var tab = [];
            angular.forEach(input, function(value, key){
                if(value.when.start == schedule && value.day == day) {
                    tab.push(value);
                }
            });
            return tab;
        };
    });

/**
 * Agenda Service
 */
app.factory('AgendaService',['$ionicPopup', function($ionicPopup) {

    var agendaFactory = {

        /** add conference in agenda **/
        addToAgenda : function (idConference){

            var agenda = [];
            var alreadyExist = false;

            if(localStorage.getItem('myAgenda') === null){
                $ionicPopup.confirm({
                    title: 'Add conference',
                    content: 'Do you want add this conference on your agenda ?'
                }).then(function(res) {
                    if(res) {
                        agenda = [];
                        agenda.push(idConference);
                        localStorage.setItem('myAgenda',JSON.stringify(agenda));
                    }
                });
            }else{
                agenda = JSON.parse(localStorage.getItem('myAgenda'));
                angular.forEach(agenda, function(value,key){
                    if(value == idConference){
                        $ionicPopup.alert({
                            title: 'Impossible',
                            content: 'You are already to add this conference'
                        });
                        alreadyExist = true;
                    }
                });
                if(alreadyExist === false){
                    $ionicPopup.confirm({
                        title: 'Add conference',
                        content: 'Do you want add this conference on your agenda ?'
                    }).then(function(res) {
                        if(res) {
                            agenda.push(idConference);
                            localStorage.setItem('myAgenda',JSON.stringify(agenda));
                        }
                    });
                }
            }
        },
        /** check if a conference exist in the agenda with the same begin schedule in tabConference **/
        checkSameScheduleConferenceInAgenda : function(idConference,tabConferences){

            var conference = null;
            var res = false;
            var index = 0;
            var conferencesInAgenda = [];
            var agendaSearch = JSON.parse(localStorage.getItem('myAgenda'));

            // recherche des conferences
            for(i = 0 ; i < tabConferences.length; i++){
                if (tabConferences[i]._id == idConference) {
                    conference = tabConferences[i];
                }
                if(agendaSearch.indexOf(tabConferences[i]._id+"") != -1){
                    conferencesInAgenda.push(tabConferences[i]);
                }
            }
            // recherche du meme horaire
            while(res === false && index < conferencesInAgenda.length){
                if(conferencesInAgenda[index].when.start == conference.when.start){
                    console.log("Conference with the same start find !");
                    res = true;
                }
                index++;
            }
            console.log("Same schedule ? : "+res);
            return res;
        }
    };

    return agendaFactory;
}]);
/**
 * Conference Service
 */
app.factory('ConferencesService', ['$resource', function($resource) {

    var confFactory = {
        conferencesResource : [],
        scheduleConference : [],

        /** get online resource for retreive a conference list **/
        getOnlineConference : function (){
            confFactory.conferencesResource =  $resource('http://techforum-worldline.rhcloud.com//conferences/:id',{id:'@id'});
            return confFactory.conferencesResource;
        },
        /** get local resource for retreive a interne conference list (view data folder)**/
        getLocalConferences : function(){
            confFactory.conferencesResource = $resource('data/conferences.json');
            return confFactory.conferencesResource;
        },
        /** create a tab sort with start schedule conference **/
        sortConferenceByStart : function(pConference){
            var tab =[];
            angular.forEach(pConference, function(value, key){
                if(tab.indexOf(value.when.start) == -1)
                    tab.push(value.when.start);
            });
            confFactory.scheduleConference = tab.sort();
            return confFactory.scheduleConference;
        },
        /** create a tab sort with start schedule conference by day **/
        sortConferenceByStartByDay : function(pConference,day){
            var tab =[];
            if(day === 0){
                tab = [];
            }else{
                angular.forEach(pConference, function(value, key){
                    if(tab.indexOf(value.when.start) == -1 && value.day == day){
                        tab.push(value.when.start);
                    }
                });
            }
            confFactory.scheduleConference = tab.sort();
            return confFactory.scheduleConference;
        },
        /** check if two conference are equals **/
        checkSameConferences : function(pConference1,pConference2){
            return angular.equals(pConference1,pConference2);
        },
        /** getter scheduleConference **/
        getScheduleConference : function(){
          return confFactory.scheduleConference;
        },
        /** setter scheduleConference **/
        setConferencesResource : function(conferences){
            confFactory.conferencesResource = conferences;
        },
        /** getter conferencesResource **/
        getConferencesResource : function(){
            return confFactory.conferencesResource;
        },
        /** check if conferencesResource is empty **/
        conferenceResourceIsEmpty : function(){
            confFactory.getConferencesResource().query(
                function(data){
                    if(data === null)
                        return true;
                    else
                        return false;
                },function(reason){
                    return true;
                }
            );
         }
    };

    return confFactory;
}]);



/**
 * Date Service
 */
app.factory('DateService', function() {

    var dateFactory = {

        /** compare two date : 0 if date_1=date_2 , 1 if date_1>date_2 , -1 if date_1<date_2 **/
        compare : function (date_1, date_2){
            var diff = date_1.getTime()-date_2.getTime();
            return (diff===0?diff:diff/Math.abs(diff));
        },
        /** get a time between two date **/
        dateDiff : function(date1, date2){
            var diff = {};
            var tmp = date2 - date1;

            tmp = Math.floor(tmp/1000);             // second number between two date
            diff.sec = tmp % 60;                    // Extraction second number

            tmp = Math.floor((tmp-diff.sec)/60);    // minute number
            diff.min = tmp % 60;                    // Extraction minute number

            tmp = Math.floor((tmp-diff.min)/60);    // hour number
            diff.hour = tmp % 24;                   // Extraction hour number

            tmp = Math.floor((tmp-diff.hour)/24);   // day number
            diff.day = tmp;

            return diff;
        },
        /** get the earliest date a function of the start time of phone **/
        nextSchedule : function(tab,date){
            //la date la plus ancien pour avoir un grand timestamps
            var res = new Date(2014,5,5)-date;
            tab.sort();

            for(i = 0; i < tab.length;i++){
                heure = tab[i].substring(0,2);
                minute = tab[i].substring(3,5);
                var d = new Date(date.getFullYear(),date.getMonth(),date.getDate(),heure,minute);
                if(date < d){
                    if(d-date<res) {
                        res = tab[i];
                        return res;
                    }else{
                        console.log('NO d-date<res : '+d+"-"+date+"<"+res);
                    }
                }else
                    console.log(' NO date < d : '+date +" < "+d);
            }
        }
    };
    return dateFactory;
});

/**
 * Message Service
 */
app.factory('MessagesService', ['$resource', function($resource) {

    var msgFactory = {

        commentResource : [],
        /** get online comment resource by conference **/
        getOnlineMsgCommentByIdConference : function (idConference){
            var lien = 'http://techforum-worldline.rhcloud.com//messages/comments/'+idConference;
            return $resource(lien);
        },
        /** get online comment resource **/
        getOnlineMsgComment : function (){
            msgFactory.commentResource = $resource('http://techforum-worldline.rhcloud.com//messages/comments/');
            return msgFactory.commentResource;
        }
    };
    return msgFactory;
}]);
