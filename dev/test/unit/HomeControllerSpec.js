describe("HomeController Tests", function() {

    var ctrl,scope;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope,$controller){
        scope = $rootScope.$new();
        scope.message = "hello";
        ctrl = $controller('HomeController',{"$scope":scope})
    }));

    it("test hello", function() {
        expect(scope.message).toBe("hello");
    });


});
