/**
 * Date Service
 */
app.factory('DateService', function() {

    var dateFactory = {

        /** compare two date : 0 if date_1=date_2 , 1 if date_1>date_2 , -1 if date_1<date_2 **/
        compare : function (date_1, date_2){
            var diff = date_1.getTime()-date_2.getTime();
            return (diff===0?diff:diff/Math.abs(diff));
        },
        /** get a time between two date **/
        dateDiff : function(date1, date2){
            var diff = {};
            var tmp = date2 - date1;

            tmp = Math.floor(tmp/1000);             // second number between two date
            diff.sec = tmp % 60;                    // Extraction second number

            tmp = Math.floor((tmp-diff.sec)/60);    // minute number
            diff.min = tmp % 60;                    // Extraction minute number

            tmp = Math.floor((tmp-diff.min)/60);    // hour number
            diff.hour = tmp % 24;                   // Extraction hour number

            tmp = Math.floor((tmp-diff.hour)/24);   // day number
            diff.day = tmp;

            return diff;
        },
        /** get the earliest date a function of the start time of phone **/
        nextSchedule : function(tab,date){
            //la date la plus ancien pour avoir un grand timestamps
            var res = new Date(2014,5,5)-date;
            tab.sort();

            for(i = 0; i < tab.length;i++){
                heure = tab[i].substring(0,2);
                minute = tab[i].substring(3,5);
                var d = new Date(date.getFullYear(),date.getMonth(),date.getDate(),heure,minute);
                if(date < d){
                    if(d-date<res) {
                        res = tab[i];
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
