app.factory('ConnectionService', function() {

    var connectionFactory = {

        getTypeConnection : function (){
            var networkState = navigator.network.connection.type;
            return networkState;
        },
        isConnected : function() {
            var networkState = navigator.network.connection.type;
            if(networkState == Connection.NONE)
                return false;
            else
                return true;
        }
    };

    return connectionFactory;
});
