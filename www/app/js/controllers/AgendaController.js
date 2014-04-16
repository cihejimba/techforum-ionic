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
        }

        /** Retrieve schedule conference **/
        if (localStorage.getItem('conferences') != null){
            var conferences = JSON.parse(localStorage.getItem('conferences'));
            getSchedule(conferences);
        }else{
            ConferencesService.getConferencesResource().query(
                function (data) {
                    localStorage.setItem('conferences', JSON.stringify(data));
                    getSchedule(data);
                }
            );
        }


        /** Retreive conference in agenda with localStorage and convert conference with resource conference **/
        if(localStorage.getItem('myAgenda') != null) {
            agenda = JSON.parse(localStorage.getItem('myAgenda'));
            ConferencesService.getConferencesResource().query(
                function (data) {
                    angular.forEach(data, function (value, key) {
                        if(agenda.indexOf(value._id+"") != -1){
                            conferencesInAgenda.push(value);
                        }
                    });
                    $scope.mySchedule1 = ConferencesService.sortConferenceByStartByDay(data,$scope.day.day1);
                    $scope.mySchedule2 = ConferencesService.sortConferenceByStartByDay(data,$scope.day.day2);
                    $scope.myAgenda = conferencesInAgenda;
                }, function (reason) {
                    console.log(reason);
                }
            );
        }else{
            console.log("Il n'y a pas de conferences dans l'agenda");
        }

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail',{conferenceId: idConference})
        }

        /** View conference for time in agenda **/
        $scope.viewConferenceWithTime = function(day,schedule){
            $state.go('tab.agenda-conference-schedule',{day: day,schedule:schedule});
        }

        /** Delete a conference in agenda **/
        $scope.onItemDelete = function(idConferenceToDelete) {

            if (confirm("Do you want delete this conference on your agenda ?")) {
                if (localStorage.getItem('myAgenda') != null) {
                    agenda = JSON.parse(localStorage.getItem('myAgenda'));
                    var itemAgenda = agenda.indexOf(idConferenceToDelete + "");
                    if (itemAgenda != -1) {
                        agenda.splice(itemAgenda, 1);
                        localStorage.setItem('myAgenda', JSON.stringify(agenda));
                    }
                    for (i = 0; i < $scope.myAgenda.length; i++) {
                        console.log($scope.myAgenda[i]);
                        if ($scope.myAgenda[i]._id == idConferenceToDelete)
                            $scope.myAgenda.splice(i, 1);
                    }
                } else
                    alert("Error - please can reload application");
            }else
                console.log("non confirmé");
        }
    }]);