app.factory('DateService', function() {

    var dateFactory = {

        //   0 si date_1=date_2
        //   1 si date_1>date_2
        //  -1 si date_1<date_2
        compare : function (date_1, date_2){
            diff = date_1.getTime()-date_2.getTime();
            return (diff==0?diff:diff/Math.abs(diff));
        },
        dateDiff : function(date1, date2){
            var diff = {}                           // Initialisation du retour
            var tmp = date2 - date1;

            tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
            diff.sec = tmp % 60;                    // Extraction du nombre de secondes

            tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
            diff.min = tmp % 60;                    // Extraction du nombre de minutes

            tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
            diff.hour = tmp % 24;                   // Extraction du nombre d'heures

            tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
            diff.day = tmp;

            return diff;
        },
        nextSchedule : function(tab,date){
            //la date la plus ancien pour avoir un grand timestamps
            var res = new Date(2014,5,5)-date;
            tab.sort();
            console.log("date : "+date);
            console.log(tab);
            console.log("res : "+res);
            console.log("Debut for");
            for(i = 0; i < tab.length;i++){
                console.log("-------------- Tab["+i+"] : "+tab[i]+" -----------------");
                heure = tab[i].substring(0,2);
                minute = tab[i].substring(3,5);
                console.log("heure : "+heure);
                console.log("minute : "+minute);
                var d = new Date(date.getFullYear(),date.getMonth(),date.getDate(),heure,minute);
                console.log("d = "+d);
                if(date < d){
                    console.log('YES date < d : '+date +" < "+d);
                    if(d-date<res) {
                        console.log('YES d-date<res : '+d+"-"+date+"<"+res);
                        res = tab[i];
                        console.log(" ******* res = tab[i]"+res+ "="+ tab[i])
                        return res;
                    }else{
                        console.log('NO d-date<res : '+d+"-"+date+"<"+res);
                    }
                }else
                    console.log(' NO date < d : '+date +" < "+d);
            }
        }
    };
    return dateFactory;
});
