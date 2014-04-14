angular.module('app')
    .controller('DetailConferenceController', ['$scope','$stateParams','ConferencesService','MessagesService','$ionicNavBarDelegate','$ionicLoading','$resource','$state','AgendaService', function($scope,$stateParams,ConferencesService,MessagesService,$ionicNavBarDelegate,$ionicLoading,$resource,$state,AgendaService)
    {
        console.log('--- DetailConferenceController ---');

        var idConference = $stateParams.conferenceId;
        var conferences = [];
        $scope.comments = [];
        $scope.loadingComment = "loading...";
        $scope.showHideComment = 'show';
        $scope.newComment = {
            name : null,
            msg : null
        }


        $scope.displayDescription = function(){
            if($scope.showHideComment == 'show'){
                $scope.showHideComment = 'hide';
            }else
                $scope.showHideComment = 'show';
        }

        $scope.getConference = function(){
            ConferencesService.getLocalConferences().query(function(data){
                conferences = data;
                angular.forEach(data,function(conference , key) {
                    if (conference._id == idConference) {
                        getComments();
                        return $scope.conference = conference;
                    }
                });
            },function(reason){
                console.log(reason);
                alert('Enable to retrieve a conference with id '+idConference);
            });
        }

        $scope.postComment = function(idConference){

            var commentR = MessagesService.getOnlineMsgComment();
            comment = new commentR();
            comment.name = $scope.newComment.name,
            comment.msg = $scope.newComment.msg,
            comment.type = "comment",
            comment.date = new Date(),
            comment.idConference = idConference

            comment.$save(
                function(data, getResponseHeadersSuccess){
                    alert("Your comment has been sent correctly.")
                    getComments();
                },
                function(data,getResponseHeadersError){
                    console.log("Impossible to send your comment");
                }
            );

            $scope.newComment.name = null;
            $scope.newComment.msg = null;

        }

        var getComments = function(){
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
            $state.go('tab.conferences');
            //$ionicNavBarDelegate.back();
        }

        $scope.addAgenda = function(id){

            if(localStorage.getItem("myAgenda") == null)
                AgendaService.addToAgenda(id);
            else{
                if(AgendaService.checkSameScheduleConferenceInAgenda(id,conferences) == false)
                    AgendaService.addToAgenda(id);
                else
                    alert("One conference already to add with the same to start");
            }
        }
    }]);