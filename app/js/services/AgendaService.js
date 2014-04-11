app.factory('AgendaService',['ConferencesService', function(ConferencesService) {

    var agendaFactory = {

        addToAgenda : function (idConference){

            var agenda = [];
            var alreadyExist = false;

            if(localStorage.getItem('myAgenda') == null){
                agenda = new Array();
                agenda.push(idConference);
                localStorage.setItem('myAgenda',JSON.stringify(agenda));
                alert("Conference to add on your agenda");
            }else{
                agenda = JSON.parse(localStorage.getItem('myAgenda'));
                angular.forEach(agenda, function(value,key){
                    if(value == idConference){
                        alert("You are already to add this conference");
                        alreadyExist = true;
                    }
                });
                if(alreadyExist == false){
                    agenda.push(idConference);
                    localStorage.setItem('myAgenda',JSON.stringify(agenda));
                    alert("Conference to add on your agenda");
                }
            }
        },
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
            while(res == false && index < conferencesInAgenda.length){
                if(conferencesInAgenda[index].when.start == conference.when.start){
                    console.log("Conference with the same start find !");
                    res = true;
                }
                index++;
            };
            console.log("Same schedule : "+res);
            return res;
        }
    };

    return agendaFactory;
}]);