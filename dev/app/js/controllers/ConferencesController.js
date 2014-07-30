/**
 * Conference Controller
 */
angular.module('app')
    .controller('ConferencesController', ['$scope','ConferencesService','$ionicLoading','$state','$ionicPopup','ConnectionService', function($scope,ConferencesService,$ionicLoading,$state,$ionicPopup,ConnectionService)
    {
        console.log('--- ConferencesController ---');

        $scope.conferences = [];
        $scope.scheduleconferences = [];
        $scope.selectedConferenceId = -1;

        if (localStorage.getItem('pageDayConference') !== null){
            var numPageDay =  localStorage.getItem('pageDayConference');
            $scope.numButton = numPageDay;
            $scope.search = {day : numPageDay};
        }else{
            $scope.search = {day : 1};
            $scope.numButton = 1;
        }

        /**
         * Change page for day
         * @param pageDay number of page
         */
        $scope.clickPageDay = function(pageDay){
            localStorage.setItem("pageDayConference", pageDay);
            $scope.search.day = pageDay;
            $scope.numButton = pageDay;
        };

        /** Retrieve all conference for to display in conference list
         * Is not conference in localStorage = retrieve by internet and display a loading
         * Else display conference in localStorage
         * **/
        $scope.getAllConf = function(){
            if (localStorage.getItem('conferences') === null) {

                $ionicLoading.show();

                ConferencesService.getLocalConferences().query(
                    function(data){
                        $scope.conferences = data;
                        $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                        localStorage.setItem('conferences', JSON.stringify(data));
                        $ionicLoading.hide();
                    },
                    function(reason){
                        alert('Unable to retrieve conferences list');
                        $ionicLoading.hide();
                    }
                );
            } else {
                $scope.conferences = JSON.parse(localStorage.getItem('conferences'));
                $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
            }
         };

        /** Update conference list by Internet **/
        $scope.updateConference = function(){

            if(ConnectionService.isConnected()){

                $ionicLoading.show();

                ConferencesService.getOnlineConference().query(
                    function(confOnline){
                        if(!ConferencesService.checkSameConferences($scope.conferences,confOnline)){
                            $scope.conferences = confOnline;
                            ConferencesService.setConferencesResource(confOnline);
                            localStorage.setItem('conferences', JSON.stringify(confOnline));
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Update conference',
                                content: 'You have correctly update conference list'
                            });
                        }else{
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Update conference',
                                content: 'You have already a last conference list'
                            });
                        }
                    },
                    function(reason){
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: ' Unable to update conference list',
                            content: "Impossible to retrieve a conference list"
                        });
                        return -1;
                    }
                );
            }else{
                $ionicPopup.alert({
                    title: ' Unable to update conference list',
                    content: "You don't have a internet connection"
                });
            }
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