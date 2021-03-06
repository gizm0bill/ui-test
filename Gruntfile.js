module.exports = function(grunt) 
{
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig
  ({
    pkg: grunt.file.readJSON('package.json'),

		express: 
    {
      test:{ options: { port: 7357, script: 'index.js' } }
    },
    karma: 
    { 
      options: { configFile: 'test/karma.conf.js', logLevel: 'ERROR' },
      unit: {} 
    },
    protractor: 
    { 
      options: { configFile: 'test/protractor.conf.js', keepAlive: true, webdriverManagerUpdate: true },
      e2e: {}
    }

  });

  grunt.registerTask('unit', [ 'express:test', 'karma' ]);
  grunt.registerTask('e2e', [ 'express:test', 'protractor' ]);

}