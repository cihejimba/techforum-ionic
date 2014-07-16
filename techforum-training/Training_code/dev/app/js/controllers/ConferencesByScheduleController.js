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