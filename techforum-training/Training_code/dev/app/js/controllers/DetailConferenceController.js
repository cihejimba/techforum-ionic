/**
 * DetailConference Controller
 */
angular.module('app')
    .controller('DetailConferenceController', ['$scope','$stateParams','ConferencesService','MessagesService','$ionicNavBarDelegate','AgendaService','$ionicPopup','ConnectionService', function($scope,$stateParams,ConferencesService,MessagesService,$ionicNavBarDelegate,AgendaService,$ionicPopup,ConnectionService)
    {
        console.log('--- DetailConferenceController ---');

        var idConference = $stateParams.conferenceId;
        var conferences = [];
        $scope.comments = [];
        $scope.conference = [];
        $scope.loadingComment = "loading...";
        $scope.showHideComment = 'show';
        $scope.newComment = {
            name : null,
            msg : null
        };

        /** Display conference description **/
        $scope.displayDescription = function(){
            if($scope.showHideComment == 'show'){
                $scope.showHideComment = 'hide';
            }else
                $scope.showHideComment = 'show';
        };

        /** Retrieve conference by id with $stateParam and display detail conference **/
        $scope.getConference = function(){
            ConferencesService.getLocalConferences().query(function(data){
                conferences = data;
                angular.forEach(data,function(conference , key) {
                    if (conference._id == idConference) {
                        getComments();
                        $scope.conference = conference;
                    }
                });
            },function(reason){
                alert('Enable to retrieve a conference with id '+idConference);
            });
        };

        /** Post a comment on server for conference with id : idConference **/
        $scope.postComment = function(idConference){

            if($scope.newComment.name !== null && $scope.newComment.msg !== null){
                if(ConnectionService.isConnected()){

                    var commentR = MessagesService.getOnlineMsgComment();
                    var comment = new commentR();
                    comment.name = $scope.newComment.name;
                    comment.msg = $scope.newComment.msg;
                    comment.type = "comment";
                    comment.date = new Date();
                    comment.idConference = idConference;

                    comment.$save(
                        function(data, getResponseHeadersSuccess){
                            $ionicPopup.alert({
                                title: 'Send comment',
                                content: 'Your comment has been sent correctly.'
                            }).then(function(res) {
                                $scope.newComment.name = null;
                                $scope.newComment.msg = null;
                                getComments();
                            });
                        },
                        function(data,getResponseHeadersError){
                            $ionicPopup.alert({
                                title: 'Send comment',
                                content: 'Impossible to send your comment'
                            });
                        }
                    );
                }else{
                    $ionicPopup.alert({
                        title: 'unable to send comment',
                        content: "You don't have a internet connection"
                    });
                }
            }else{
                $ionicPopup.alert({
                    title: 'Warning',
                    content: "You must complete all the fields"
                });
            }


        };

        /** retrieve all comment for conference **/
        var getComments = function(){
            MessagesService.getOnlineMsgCommentByIdConference(idConference).query(
                function(data){
                    $scope.comments = data;
                    $scope.loadingComment = "";
                },function(reason){
                    $scope.loadingComment = "";
                }
            );
        };

        /** Return to conference list **/
        $scope.back =function(){
            $ionicNavBarDelegate.back();
        };

        /** Add a conference in agenda **/
        $scope.addAgenda = function(id){

            if(localStorage.getItem("myAgenda") === null)
                AgendaService.addToAgenda(id);
            else{
                if(AgendaService.checkSameScheduleConferenceInAgenda(id,conferences) === false)
                    AgendaService.addToAgenda(id);
                else{
                    $ionicPopup.alert({
                        title: 'Impossible',
                        content: 'One conference already to add with the same to start'
                    });
                }
            }
        };
    }]);