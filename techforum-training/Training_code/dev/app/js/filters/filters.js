/** module filter **/
angular.module('techForum.filters',[])

    /** sort conference by schedule and day **/
    .filter('scheduleByConference', function() {
        return function(input, schedule, day) {
            var tab = [];
            angular.forEach(input, function(value, key){
                if(value.when.start == schedule && value.day == day) {
                    tab.push(value);
                }
            });
            return tab;
        };
    });
