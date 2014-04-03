angular.module('app')
    .controller('DetailConferenceController', ['$scope','$stateParams','ConferencesService','$ionicNavBarDelegate', function($scope,$stateParams,ConferencesService,$ionicNavBarDelegate)
    {
        console.log('--- DetailConferenceController ---');

        $scope.conference = ConferencesService.getConferencebyId($stateParams.conferenceId);

        $scope.backConferences =function(){
            $ionicNavBarDelegate.back();
        }
    }]);