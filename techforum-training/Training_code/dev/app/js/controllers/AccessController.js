/**
 * Access Controller
 */
angular.module('app')
    .controller('AccessController', ['$scope','ConnectionService', function($scope,ConnectionService)
    {
        console.log('--- AccessController ---');
        $scope.fromLilleFlandre = false;
        $scope.fromlesquin = false;

        /** display route to WorldLine by from **/
        $scope.displayFrom = function(from){
            if(from == 'lille'){
                var a = $scope.fromLilleFlandre ? $scope.fromLilleFlandre = false : $scope.fromLilleFlandre = true;
            }else if(from == 'lesquin'){
                var b = $scope.fromlesquin ? $scope.fromlesquin = false : $scope.fromlesquin =true;
            }else
                alert("Impossible to display From "+from);
        };

        /** Default Worldline Seclin GPS **/
        $scope.worldlineGPS ={
            latitude: 50.567593,
            longitude: 3.029413
        };

        if(ConnectionService.isConnected()) {
            $scope.connected = true;
            /** Configuration Map **/
            $scope.map = {
                center: {
                    latitude: $scope.worldlineGPS.latitude,
                    longitude: $scope.worldlineGPS.longitude
                },
                markerWorldline: {
                    "latitude": $scope.worldlineGPS.latitude,
                    "longitude": $scope.worldlineGPS.longitude,
                    "showWindow": true,
                    "title": "Worldine"
                },
                markerYou: {
                    "latitude": $scope.worldlineGPS.latitude,
                    "longitude": $scope.worldlineGPS.longitude,
                    "showWindow": true,
                    "title": "Your Position"
                },
                zoom: 14
            };
        }else{
            $scope.connected = false;
        }



        /** WorldLine Localisation **/
        $scope.locateWorldline = function(){
            $scope.map.center.latitude = $scope.worldlineGPS.latitude;
            $scope.map.center.longitude = $scope.worldlineGPS.longitude;
        };

        /** User Geolocalisation **/
        $scope.getMyposition = function() {
            /**
             * *****************
             * TO DO
             * Implement a current position
             * Update map marker and map center
             *
             * *****************
             */
        };
    }]);