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

        if(DateService.compare(day1,todayShort) == 0 ){
            $scope.current_day.day = 1;
        }else if(DateService.compare(day2,todayShort) == 0 ){
            $scope.current_day.day = 2;
        }else
            $scope.current_day.day = 0;

        //first and only call to getLocalConferences -it's to retreive a conference.json - after use getConferencesResource
        ConferencesService.getLocalConferences().query(
            function(data){
                $scope.conferences = data;
                $scope.scheduleConferences = ConferencesService.sortConferenceByStartByDay(data,$scope.current_day.day);
                $scope.nextSchedule = DateService.nextSchedule($scope.scheduleConferences,today);
            },
            function(reason){
            }
        );
        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail',{conferenceId: idConference})
        }
    }]);