module.exports = function(grunt) {

  grunt.initConfig({
    sassGlobber: {
      options: {
        sassRoot: 'sass/',
      },
      dist: {
        options: {
          watch: false
        },
        files: [{
          src: './main.scss',
          dest: 'tmp.main.scss'
        }]
      }
    },
    'dart-sass': {
       target: {
        files: {
          'css/css.css': 'sass/tmp.main.scss'
        },
         options: {
             sourceMap: true,
             outputStyle: 'expanded'
         }
      }
    },
    clean: {
      tempFile: {
        src: ["sass/tmp.main.scss"]
      }
    },
    watch: {
      sass: {
        options: {
          spawn: false,
          livereload: true
        },
        files: [
          'sass/**/**/*.scss',
          'sass/**/*.scss',
          'sass/*.scss',
          '!sass/tmp.main.scss'
        ],
        tasks: ['compile']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-globber');
  grunt.loadNpmTasks('grunt-dart-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('compile', 'Compile Sass', [
    'sassGlobber:dist',
    'dart-sass',
    'clean:tempFile'
  ]);
  grunt.registerTask('default', 'Default Tasks', [
      'sassGlobber:dist',
      'dart-sass',
      'clean:tempFile',
      'watch'
  ]);

};
