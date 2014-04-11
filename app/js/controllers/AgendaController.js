angular.module('app')
    .controller('AgendaController', ['$scope','ConferencesService', function($scope,ConferencesService)
    {
        console.log('--- AgendaController ---');

        var conferencesInAgenda = [];
        var agenda = null;
        $scope.myAgenda = [];

        if(localStorage.getItem('myAgenda') != null) {
            agenda = JSON.parse(localStorage.getItem('myAgenda'));
            ConferencesService.getConferencesResource().query(
                function (data) {
                    angular.forEach(data, function (value, key) {
                        if(agenda.indexOf(value._id+"") != -1){
                            conferencesInAgenda.push(value);
                        }
                    });
                    $scope.mySchedule = ConferencesService.sortConferenceByStart(conferencesInAgenda);
                    $scope.myAgenda = conferencesInAgenda;
                }, function (reason) {
                    console.log(reason);
                }
            );
        }else{
            console.log("Il n'y a pas de conferences dans l'agenda");
        }




    }]);