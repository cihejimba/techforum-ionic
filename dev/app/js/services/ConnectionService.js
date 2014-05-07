/**
 * Connection Service
 */
app.factory('ConnectionService', function() {

    var connectionFactory = {

        /** Check if device is connected **/
        isConnected : function (){

            /**
             * Cordova plugin Network-information doesn't work on ios.
             * Catch ios platform and return a specific result.
             * We suppose user uses a internet connection and with a promise in angular
             * resource, we catch for success or error to retrieve a internet data.
             **/
            if(ionic.Platform.isIOS() || ionic.Platform.isIPad()){
                return true;
            }else{
                var networkState = navigator.connection.type;
                var states = {};
                states[Connection.UNKNOWN]  = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI]     = 'WiFi connection';
                states[Connection.CELL_2G]  = 'Cell 2G connection';
                states[Connection.CELL_3G]  = 'Cell 3G connection';
                states[Connection.CELL_4G]  = 'Cell 4G connection';
                states[Connection.CELL]     = 'Cell generic connection';
                states[Connection.NONE]     = 'No network connection';

                if(states[networkState] === states[Connection.NONE])
                    return false;
                else
                    return true;
            }
        }

    };

    return connectionFactory;
});