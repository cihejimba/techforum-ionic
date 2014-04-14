angular.module('techForum.filters',[])
    .filter('scheduleByConference', function() {
        return function(input, schedule, day) {
            tab = [];
            angular.forEach(input, function(value, key){
                if(value.when.start == schedule && value.day == day) {

                    tab.push(value);
                }
            });
            return tab;
        }
    })
