describe("App config Tests", function() {

    var module;

    beforeEach(function(){
        module = angular.module("app");
    });

    it("module 'app' should be registered", function() {
        expect(module).not.toBe(null);
    });

    describe("Dependencies app module", function() {

        var deps;
        var hasModule = function(m) {
            return deps.indexOf(m) >= 0;
        };
        beforeEach(function() {
            deps = module.value('appName').requires;
        });

        it("should have 'ionic' as a dependency", function() {
            expect(hasModule('ionic')).toBe(true);
        });

        it("should have 'ngResource' as a dependency", function() {
            expect(hasModule('ngResource')).toBe(true);
        });

        it("should have 'techForum.filters' as a dependency", function() {
            expect(hasModule('techForum.filters')).toBe(true);
        });

        it("should have 'google-maps' as a dependency", function() {
            expect(hasModule('google-maps')).toBe(true);
        });
    });

    describe("Testing controllers", function() {

        var app;

        beforeEach(function(){
            app = angular.module("app");
        });

        it("should have a 'HomeController'", function() {
            expect(app.HomeController).not.toBe(null);
        });
        it("should have a 'ConferencesController'", function() {
            expect(app.ConferencesController).not.toBe(null);
        });
        it("should have a 'ConferencesbyScheduleController'", function() {
            expect(app.ConferencesbyScheduleController).not.toBe(null);
        });
        it("should have a 'DetailConferenceController'", function() {
            expect(app.DetailConferenceController).not.toBe(null);
        });
        it("should have a 'AgendaController'", function() {
            expect(app.AgendaController).not.toBe(null);
        });
        it("should have a 'AccessController'", function() {
            expect(app.AccessController).not.toBe(null);
        });

    });
});
