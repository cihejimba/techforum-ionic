angular.module('app')
    .controller('DetailConferenceController', ['$scope','$stateParams','ConferencesService','$ionicNavBarDelegate','$ionicLoading', function($scope,$stateParams,ConferencesService,$ionicNavBarDelegate,$ionicLoading)
    {
        console.log('--- DetailConferenceController ---');
        $scope.conference = null;

        $scope.loading = $ionicLoading.show({
            content: '<div>Loading<br><figure><img src="data/atos-loader.gif"/></figure></div>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        $scope.getConference = function(){
            $scope.conference = ConferencesService.getConferencebyId($stateParams.conferenceId);
            $scope.conference.$promise.then(function(data){
                console.log(data);
                $scope.loading.hide();
            })
        }

        $scope.backConferences =function(){
            $ionicNavBarDelegate.back();
        }
    }]);