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