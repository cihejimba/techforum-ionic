module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.initConfig({

        jshint: {
            all: ['app/js/*.js','!app/js/min.js']
        },

        concat: {
            options: {
                separator: ';'
            },
            fusionJS: {
                src: ['app/libs/angular/angular.js', 'app/libs/angular/angular-sanitize.js'],
                dest: 'app/libs/script.js'
            }
        },

        uglify: {
            minJS: {
                files: {
                    'app/js/min.js': ['app/libs/script.js']
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'app/css/min.css': ['app/css/*.css']
                }
            }
        }
    });

    grunt.registerTask('default',['jshint','concat','uglify','cssmin']);

}