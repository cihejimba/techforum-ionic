module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.initConfig({

        jshint: {
            all: ['app/js/**/*.js','!app/js/techforum.js',"!app/js/techforum-min.js"],
            techforum :['app/js/techforum.js']
        },

        concat: {
            fusionJS: {
                src: ['app/js/app.js', 'app/js/**/*.js',"!app/js/techforum-min.js"],
                dest: 'app/js/techforum.js'
            }
        },

        uglify: {
            minJS: {
                files: {
                    'app/js/techforum-min.js': ['app/js/techforum.js']
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'app/css/techforum-min.css': ['app/css/**/*.css','!app/css/techforum-min.css']
                }
            }
        }
    });
    grunt.registerTask('default',['jshint:all','concat','jshint:techforum','uglify','cssmin']);
}