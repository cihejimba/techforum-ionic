/**
 * Agenda Service
 */
app.factory('AgendaService',['$ionicPopup', function($ionicPopup) {

    var agendaFactory = {

        /** add conference in agenda **/
        addToAgenda : function (idConference){

            var agenda = [];
            var alreadyExist = false;

            if(localStorage.getItem('myAgenda') === null){
                $ionicPopup.confirm({
                    title: 'Add conference',
                    content: 'Do you want add this conference on your agenda ?'
                }).then(function(res) {
                    if(res) {
                        agenda = [];
                        agenda.push(idConference);
                        localStorage.setItem('myAgenda',JSON.stringify(agenda));
                    }
                });
            }else{
                agenda = JSON.parse(localStorage.getItem('myAgenda'));
                angular.forEach(agenda, function(value,key){
                    if(value == idConference){
                        $ionicPopup.alert({
                            title: 'Impossible',
                            content: 'You are already to add this conference'
                        });
                        alreadyExist = true;
                    }
                });
                if(alreadyExist === false){
                    $ionicPopup.confirm({
                        title: 'Add conference',
                        content: 'Do you want add this conference on your agenda ?'
                    }).then(function(res) {
                        if(res) {
                            agenda.push(idConference);
                            localStorage.setItem('myAgenda',JSON.stringify(agenda));
                        }
                    });
                }
            }
        },
        /** check if a conference exist in the agenda with the same begin schedule in tabConference **/
        checkSameScheduleConferenceInAgenda : function(idConference,tabConferences){

            var conference = null;
            var res = false;
            var index = 0;
            var conferencesInAgenda = [];
            var agendaSearch = JSON.parse(localStorage.getItem('myAgenda'));

            // recherche des conferences
            for(i = 0 ; i < tabConferences.length; i++){
                if (tabConferences[i]._id == idConference) {
                    conference = tabConferences[i];
                }
                if(agendaSearch.indexOf(tabConferences[i]._id+"") != -1){
                    conferencesInAgenda.push(tabConferences[i]);
                }
            }
            // recherche du meme horaire
            while(res === false && index < conferencesInAgenda.length){
                if(conferencesInAgenda[index].when.start == conference.when.start){
                    console.log("Conference with the same start find !");
                    res = true;
                }
                index++;
            }
            console.log("Same schedule ? : "+res);
            return res;
        }
    };

    return agendaFactory;
}]);