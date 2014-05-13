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

    describe("Testing routes", function() {

        beforeEach(function() {
            deps = module.value('appName').requires;
        });

        it("Existing Home  ", function() {

        });

    });
});
