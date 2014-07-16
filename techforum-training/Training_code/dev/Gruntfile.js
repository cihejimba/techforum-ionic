module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.initConfig({

        jshint: {
            dev: ['app/js/**/*.js'],
            techforum :['../www/app/js/techforum.js']
        },

        concat: {
            fusionJS: {
                src: ['app/js/app.js', 'app/js/**/*.js'],
                dest: '../www/app/js/techforum.js'
            }
        },

        uglify: {
            minJSdev: {
                files: {
                    '../www/app/js/techforum-min.js': ['../www/app/js/techforum.js']
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    '../www/app/css/techforum-min.css': ['app/css/**/*.css']
                }
            }
        },

        processhtml: {
            dist: {
                files: {
                    '../www/app/main.html': ['app/main.html']
                }
            }
        }
    });
    grunt.registerTask('default',['jshint:dev','concat','jshint:techforum','uglify','cssmin','processhtml']);
}