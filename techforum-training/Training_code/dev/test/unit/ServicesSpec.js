describe("Services Tests", function() {

    var module;

    beforeEach(function(){
        module = angular.module("app");
    });
    describe("ConnectionService testing", function() {

        beforeEach(inject(function($injector){
            ConnectionService = $injector.get('ConnectionService');
        }));

        it("should have an 'isConnected' function", function () {
            expect(angular.isFunction(ConnectionService.isConnected)).toBe(true);
        });
    });

    describe("MessagesService testing", function() {

        beforeEach(inject(function($injector){
            MessagesService = $injector.get('MessagesService');

        }));
        it("should have an 'getOnlineMsgCommentByIdConference' function", function () {
            expect(angular.isFunction(MessagesService.getOnlineMsgCommentByIdConference)).toBe(true);
        });
        it("should have an 'getOnlineMsgComment' function", function () {
            expect(angular.isFunction(MessagesService.getOnlineMsgComment)).toBe(true);
        });
    });

});
