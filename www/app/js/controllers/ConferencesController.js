/**
 * Conference Controller
 */
angular.module('app')
    .controller('ConferencesController', ['$scope','ConferencesService','$ionicLoading','$state','$ionicPopup', function($scope,ConferencesService,$ionicLoading,$state,$ionicPopup)
    {
        console.log('--- ConferencesController ---');

        $scope.conferences = [];
        $scope.scheduleconferences = [];
        $scope.numButton = 1;
        $scope.selectedConferenceId = -1;

        /** Retrieve all conference for to display in conference list
         * Is not conference in localStorage = retrieve by internet and display a loading
         * Else display conference in localStorage
         * **/
        $scope.getAllConf = function(){
            if (localStorage.getItem('conferences') === null) {
                $scope.loading = $ionicLoading.show({
                    content: '<div>Loading conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                ConferencesService.getLocalConferences().query(
                    function(data){
                        $scope.conferences = data;
                        $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                        localStorage.setItem('conferences', JSON.stringify(data));
                        $scope.loading.hide();
                    },
                    function(reason){
                        alert('Unable to retrieve conferences list');
                        $scope.loading.hide();
                    }
                );
            } else {
                $scope.conferences = JSON.parse(localStorage.getItem('conferences'));
                $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
            }
         };

        /** Update conference list by Internet **/
        $scope.updateConference = function(){

           $scope.loading = $ionicLoading.show({
               content: '<div>Update conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>',
               animation: 'fade-in',
               showBackdrop: true,
               maxWidth: 200,
               showDelay: 0
           });

            ConferencesService.getOnlineConference().query(
                function(confOnline){
                    if(!ConferencesService.checkSameConferences($scope.conferences,confOnline)){
                        $scope.conferences = confOnline;
                        ConferencesService.setConferencesResource(confOnline);
                        localStorage.setItem('conferences', JSON.stringify(confOnline));
                        $scope.loading.hide();
                        $ionicPopup.alert({
                            title: 'Update conference',
                            content: 'You have correctly update conference list'
                        });
                    }else{
                        $scope.loading.hide();
                        $ionicPopup.alert({
                            title: 'Update conference',
                            content: 'You have already a last conference list'
                        });
                    }
                },
                function(reason){
                    $scope.loading.hide();
                    return -1;
                }
            );
        };

        /** Display a conference resume in a conference list **/
        $scope.DisplayConference = function(conference){
            if($scope.selectedConferenceId == conference._id)
                $scope.selectedConferenceId = -1;
            else
                $scope.selectedConferenceId = conference._id;
        };

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
                $state.go('tab.conference-detail',{conferenceId: idConference});
        };
    }]);