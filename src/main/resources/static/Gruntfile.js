/*global module:false*/
module.exports = function(grunt) {
  
	
    grunt.initConfig({
        concat: {
            'options': { 'separator': ';' },
            'build': {
            	'src' : [ 'srcgs/vendor/jquery/jquery.js',
            	         	'srcgs/vendor/bootstrap/js/bootstrap.min.js',
            	            'srcgs/vendor/jquery/jquery.easing.min.js',
            	         	'srcgs/js/grayscale.js',
            	         	'src/js/jquery/jquery.dataTables.min.js',
            	         	'src/js/jquery/jquery.datetimepicker.js',
            	         	'src/js/knockout/knockout.js',
            	        	'src/js/jscolor/jscolor.min.js',
            	         	'src/js/app/city.js',
            	         	'src/js/app/core.js',
            	         	'src/js/app/investigation.js',
            	         	'src/js/app/user.js',
            	         	'src/js/app/status1.js',
            	         	'src/js/app/docinvit.js',
            	         	'src/js/app/manager.js',
            	         	'src/js/app/moment.js',
            	        	'src/js/app/manageruser.js',
            	        	'src/js/app/report.js',
            	         	'src/js/app/app.js'
							],	
               // 'dest': 'dist/js/invite.js'
				 'dest': 'dist/js/invite.min.js'							
            }
        },
    
        uglify: {
        	options: {
        		mangle: true,
        		sourceMap: false
             //   sourceMapName: 'dist/js/invite.map'
        		
        	},
        js: {
          files: {
        	  'dist/js/invite.min.js' : ['dist/js/invite.js']
            }
         }
       }
       
    });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
 // grunt.registerTask('default', [ 'concat', 'uglify']);
  grunt.registerTask('default', [ 'concat']);

};
