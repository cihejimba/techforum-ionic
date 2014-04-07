angular.module('app')
    .controller('HomeController', ['$scope','ConferencesService', function($scope,ConferencesService)
    {
        console.log('--- HomeController ---');

        $scope.test = [];

        ConferencesService.getLocalConferences().query(
            function(data){
                console.log(data);
                console.log("Success to retreive Local Conference");
                $scope.test = data;
            },
            function(reason){
                console.log("Impossible to retreive Local Conference");
            }
        );

    }]);