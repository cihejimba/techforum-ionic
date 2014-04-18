/**
 * Conference Service
 */
app.factory('ConferencesService', ['$resource', function($resource) {

    var confFactory = {
        conferencesResource : [],
        scheduleConference : [],

        /** get online resource for retreive a conference list **/
        getOnlineConference : function (){
            confFactory.conferencesResource =  $resource('http://techforum-worldline.rhcloud.com//conferences/:id',{id:'@id'});
            return confFactory.conferencesResource;
        },
        /** get local resource for retreive a interne conference list (view data folder)**/
        getLocalConferences : function(){
            confFactory.conferencesResource = $resource('data/conferences.json');
            return confFactory.conferencesResource;
        },
        /** create a tab sort with start schedule conference **/
        sortConferenceByStart : function(pConference){
            var tab =[];
            angular.forEach(pConference, function(value, key){
                if(tab.indexOf(value.when.start) == -1)
                    tab.push(value.when.start);
            });
            confFactory.scheduleConference = tab.sort();
            return confFactory.scheduleConference;
        },
        /** create a tab sort with start schedule conference by day **/
        sortConferenceByStartByDay : function(pConference,day){
            var tab =[];
            if(day === 0){
                tab = [];
            }else{
                angular.forEach(pConference, function(value, key){
                    if(tab.indexOf(value.when.start) == -1 && value.day == day){
                        tab.push(value.when.start);
                    }
                });
            }
            confFactory.scheduleConference = tab.sort();
            return confFactory.scheduleConference;
        },
        /** check if two conference are equals **/
        checkSameConferences : function(pConference1,pConference2){
            return angular.equals(pConference1,pConference2);
        },
        /** getter scheduleConference **/
        getScheduleConference : function(){
          return confFactory.scheduleConference;
        },
        /** setter scheduleConference **/
        setConferencesResource : function(conferences){
            confFactory.conferencesResource = conferences;
        },
        /** getter conferencesResource **/
        getConferencesResource : function(){
            return confFactory.conferencesResource;
        },
        /** check if conferencesResource is empty **/
        conferenceResourceIsEmpty : function(){
            confFactory.getConferencesResource().query(
                function(data){
                    if(data === null)
                        return true;
                    else
                        return false;
                },function(reason){
                    return true;
                }
            );
         }
    };

    return confFactory;
}]);


