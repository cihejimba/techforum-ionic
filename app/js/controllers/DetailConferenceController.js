angular.module('app')
    .controller('DetailConferenceController', ['$scope','$stateParams','ConferencesService','MessagesService','$ionicNavBarDelegate','$ionicLoading','$resource', function($scope,$stateParams,ConferencesService,MessagesService,$ionicNavBarDelegate,$ionicLoading,$resource)
    {
        console.log('--- DetailConferenceController ---');
        var idConference = $stateParams.conferenceId;
        $scope.comments = [];

        $scope.loading = $ionicLoading.show({
            content: '<div>Loading<br><figure><img src="data/atos-loader.gif"/></figure></div>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        $scope.getConference = function(){
            $scope.conference = ConferencesService.getConferencebyId(idConference);
            $scope.conference.$promise.then(function(data){
                $scope.getComments();
                console.log(data);
                $scope.loading.hide();
            })
        }

        $scope.addComment = function(){
        }

        $scope.getComments = function(){
            MessagesService.getOnlineMsgCommentByIdConference(idConference).query(
                function(data){
                    $scope.comments = data;
                },function(reason){
                    console.log(reason);
                }
            );
        }

        $scope.backConferences =function(){
            $ionicNavBarDelegate.back();
        }
    }]);