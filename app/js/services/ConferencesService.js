app.factory('ConferencesService', ['$resource', function($resource) {

    var confFactory = {
        conferencesResource : [],
        scheduleConference : [],

        getOnlineConference : function (){
            confFactory.conferencesResource =  $resource('http://techforum-worldline.rhcloud.com//conferences/:id',{id:'@id'});
            return confFactory.conferencesResource;
        },
        getLocalConferences : function(){
            confFactory.conferencesResource = $resource('data/conferences.json');
            return confFactory.conferencesResource;
        },
        sortConferenceByStart : function(pConference){
            var tab =[];
            angular.forEach(pConference, function(value, key){
                if(tab.indexOf(value.when.start) == -1)
                    tab.push(value.when.start);
            });
            confFactory.scheduleConference = tab.sort();
            return confFactory.scheduleConference;
        },
        checkSameConferences : function(pConference1,pConference2){
            return angular.equals(pConference1,pConference2);
        },
        getScheduleConference : function(){
          return confFactory.scheduleConference;
        },
        updateConferenceLocal : function(pConferenceOnline){

        },
        saveLocalStorage : function(data){
             if(localStorage){

             }else{
                alert('Vos données ne peuvent être sauvegardé en local');
             }
         }
    };

    return confFactory;
}]);
    // pense bete //
    /* var deferred = $q.defer();
     $resource('http://techforum-worldline.rhcloud.com//conferences/:id',{id:'@id'}).query(
         function(data){
             *//**success**//*
             console.log("Conferences resource loaded successfully");
             console.log('data');
             console.log(data);
             confFactory.conferences = data;
             console.log('confFactory.conferences');
             console.log(confFactory.conferences);
             deferred.resolve(confFactory.conferences);
         },
         function(reason){
             *//** error**//*
             console.log("Error : fail to loaded Conferences resource : "+reason);
             deferred.error('deferred :Error : fail to loaded Conferences resource')
         }
     );
     return deferred.promise;*/

    /*        $scope.three = conferencesResource.get({id:'5190fcc8c546978c4c000003'});*/



