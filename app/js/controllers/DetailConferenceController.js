angular.module('app')
    .controller('DetailConferenceController', ['$scope','$stateParams','ConferencesService','MessagesService','$ionicNavBarDelegate','$ionicLoading','$resource', function($scope,$stateParams,ConferencesService,MessagesService,$ionicNavBarDelegate,$ionicLoading,$resource)
    {
        console.log('--- DetailConferenceController ---');
        var idConference = $stateParams.conferenceId;
        $scope.comments = [];
        $scope.loadingComment = "loading...";
        $scope.showHideComment = 'show';

        $scope.displayDescription = function(){
            if($scope.showHideComment == 'show'){
                $scope.showHideComment = 'hide';
            }else
                $scope.showHideComment = 'show';
        }

        $scope.getConference = function(){
            ConferencesService.getLocalConferences().query(function(data){
                angular.forEach(data,function(conference , key) {
                    if (conference._id == idConference) {
                        $scope.getComments();
                        return $scope.conference = conference;
                    }
                })
            },function(reason){
                console.log(reason);
                alert('Enable to retrieve a conference with id '+idConference);
            })
        }

        $scope.addComment = function(){
        }

        $scope.getComments = function(){
            MessagesService.getOnlineMsgCommentByIdConference(idConference).query(
                function(data){
                    console.log(data);
                    $scope.comments = data;
                    $scope.loadingComment = "";
                },function(reason){
                    console.log(reason);
                    $scope.loadingComment = "";
                }
            );
        }

        $scope.backConferences =function(){
            $ionicNavBarDelegate.back();
        }
    }]);