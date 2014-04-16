/**
 * Conference Controller
 */
angular.module('app')
    .controller('ConferencesController', ['$scope','ConferencesService','$ionicLoading','$state','$timeout', function($scope,ConferencesService,$ionicLoading,$state,$timeout)
    {
        console.log('--- ConferencesController ---');

        $scope.conferences = [];
        $scope.scheduleconferences = [];
        $scope.numButton = 1;
        $scope.selectedConferenceId = -1;

        /** Retrieve all conference for to display in conference list **/
        $scope.getAllConf = function(){
            $scope.loading = $ionicLoading.show({
                content: '<div>Loading conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            $timeout(function () {
                if (localStorage.getItem('conferences') == null) {
                    console.log("localStorage.getItem('conferences') == null");
                    ConferencesService.getConferencesResource().query(
                        function (data) {
                            $scope.conferences = data;
                            $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                            localStorage.setItem('conferences', JSON.stringify(data));
                            $scope.loading.hide();
                        },
                        function (reason) {
                            console.log(reason);
                            alert('Unable to retrieve conferences list');
                            $scope.loading.hide();
                        }
                    );

                } else {
                    console.log("localStorage.getItem('conferences') != null");
                    $scope.conferences = JSON.parse(localStorage.getItem('conferences'));
                    $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                    $scope.loading.hide();
                }
            }, 1000);

         }

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
                    console.log('Same confLocal-confOnline : '+ ConferencesService.checkSameConferences($scope.conferences,confOnline));
                    if(!ConferencesService.checkSameConferences($scope.conferences,confOnline)){
                        console.log("Update conference on device");
                        $scope.conferences = confOnline;
                        ConferencesService.setConferencesResource(confOnline);
                        localStorage.setItem('conferences', JSON.stringify(confOnline));
                        $scope.loading.hide();
                    }else{
                        $scope.loading.hide();
                        console.log("Conference on device already last update");
                    }
                },
                function(reason){
                    $scope.loading.hide();
                    alert("no connexion");
                    console.log(reason);
                    return -1;
                }
            );
        }

        /** Display a conference resume in a conference list **/
        $scope.DisplayConference = function(conference){
            if($scope.selectedConferenceId == conference._id)
                $scope.selectedConferenceId = -1;
            else
                $scope.selectedConferenceId = conference._id;
        }

        /** Redirection to detail conference **/
        $scope.viewConference = function(idConference){
                $state.go('tab.conference-detail',{conferenceId: idConference})
        }
    }]);