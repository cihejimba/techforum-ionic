angular.module('app')
    .controller('AccessController', ['$scope', function($scope)
    {
        console.log('--- AccessController ---');

        /* Default Worldline Seclin **/
        $scope.worldlineGPS ={
            latitude: 50.567593,
            longitude: 3.029413
        }

        $scope.map = {
            center: {
                latitude: $scope.worldlineGPS.latitude,
                longitude: $scope.worldlineGPS.longitude
            },
            markerWorldline: {
                "latitude": $scope.worldlineGPS.latitude,
                "longitude": $scope.worldlineGPS.longitude,
                "showWindow":true,
                "title":"Worldine",
                "icon": "data/marker-worldline.png"
            },
            zoom: 14
        };

        navigator.geolocation.getCurrentPosition(
            function(position){
                $scope.map.center.latitude = position.coords.latitude;
                $scope.map.center.longitude = position.coords.longitude;

            },function(error){
              $scope.positioninfo = error;
            }
        );


    }]);