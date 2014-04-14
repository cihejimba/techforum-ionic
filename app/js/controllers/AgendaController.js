angular.module('app')
    .controller('AgendaController', ['$scope','ConferencesService','$state','$timeout', function($scope,ConferencesService,$state,$timeout)
    {
        console.log('--- AgendaController ---');

        var conferencesInAgenda = [];
        var agenda = null;
        $scope.myAgenda = [];

        $scope.day = {
            day1 : 1,
            day2 : 2
        };

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

        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail',{conferenceId: idConference})
        }

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