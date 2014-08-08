module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'src/scss/app.scss'
        }        
      }
    },

    uglify: {
      dist: {
        files: {
          'js/app.min.js': ['bower_components/jquery/dist/jquery.js', 'bower_components/foundation/js/foundation.js', 'src/js/**/*.js']
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      },

      uglify: {
        files: 'src/js/**/*.js',
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['sass', 'uglify']);
  grunt.registerTask('default', ['build','watch']);
};
