module.exports = {
	buildDirectory : 'build',
	buildDirectoryFiles : 'build/**',
	libDirectory : 'build/lib',
	viewsDirectory : 'build/views',
	appDataFiles : ['src/app/data/*.js'],
	appDataOutputFile : 'data.js',
	appDataOutputFilePath : 'build/data.js',
	appFiles : {
		js: ['build/data.js', 'src/app/app.js','src/app/filters/*.js', 'src/app/services/*.js', 'src/app/directives/*.js', 'src/app/**/*.js','!src/app/**/*.spec.js', '!src/app/data/*.js'],
		jade:['src/app/**/*.jade'],
		sass:['src/app/**/*.scss', '!src/app/css/links.scss', '!src/app/css/skins.scss', '!src/app/css/variables.scss']
	},
	appPrefixFile: 'app.prefix',
	appSuffixFile: 'app.suffix',
	appScriptOutputFile: 'app.js',
	appStyleOutputFile: 'style.css',
	additionalLibFiles: [
		'lib/ui-grid/ui-grid-unstable.js',
		'lib/ui-grid/ui-grid-unstable.css',
		'lib/amcharts/amcharts.js',
		'lib/amcharts/serial.js'],
	bowerFile : ['bower.json'],
	bowerFiles :  [
			'bower_components/**/*angular.min*',
			'bower_components/**/*angular-resource.min*',
			'bower_components/**/*angular-route.min*',
			'bower_components/**/*jquery.min.*',
			'bower_components/**/*modernizr.js',
			'bower_components/**/*foundation-icons*',
			'bower_components/**/*foundation.min*',
			'!bower_components/**/*scss',
			'!bower_components/**/*gzip'],
	bowerFiles_dev :  [
		'bower_components/angular/angular.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-touch/angular-touch.js',
		'bower_components/fastclick/lib/fastclick.js',
		'bower_components/foundation/css/foundation.css',
		'bower_components/foundation/js/foundation.js',
		'bower_components/foundation-icon-fonts/foundation-icons.css',
		'bower_components/foundation-icon-fonts/foundation-icons.eot',
		'bower_components/foundation-icon-fonts/foundation-icons.svg',
		'bower_components/foundation-icon-fonts/foundation-icons.ttf',
		'bower_components/foundation-icon-fonts/foundation-icons.woff',
		'bower_components/jquery/dist/jquery.js',
		'bower_components/jquery.cookie/jquery.cookie.js',
		'bower_components/jquery-placeholder/jquery.placeholder.js',
		'bower_components/lodash/dist/lodash.js',
		'bower_components/stringjs/lib/string.js',
		'bower_components/bluebird/js/browser/bluebird.js',
		'bower_components/modernizr/modernizr.js',
		'bower_components/traceur-runtime/traceur-runtime.js']
};