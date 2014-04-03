angular.module('techForum.filters',[])
    .filter('scheduleByConference', function() {
        return function(input, schedule) {
            tab = [];
            angular.forEach(input, function(value, key){
                if(value.when.start == schedule)
                    tab.push(value);
            });
            return tab;
        }
    })
