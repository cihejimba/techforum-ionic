angular.module('app')
    .controller('NavController', ['$scope', function($scope)
    {
        console.log('--- NavController ---');
        $scope.titleApp ="Atos TechForum 2014";
    }]);
