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
        $scope.getMyposition = function(){
            navigator.geolocation.getCurrentPosition(
                function(position){
                    $scope.$apply(function(){
                        $scope.map.markerYou.latitude = position.coords.latitude;
                        $scope.map.markerYou.longitude = position.coords.longitude;
                        $scope.map.center.latitude = position.coords.latitude;
                        $scope.map.center.longitude = position.coords.longitude;
                    });
                },function(error){
                    $scope.positioninfo = error;
                }
            );
        };
    }]);