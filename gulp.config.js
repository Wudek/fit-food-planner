module.exports = {
	buildDirectory : 'build',
	libDirectory : 'build/lib',
	viewsDirectory : 'build/views',
	appFiles : {
		js: ['src/app/**/*.js','!src/app/**/*.spec.js'],
		jade:['src/app/**/*.jade'],
		sass:['src/app/**/*.scss', '!src/app/css/colors.scss', '!src/app/css/links.scss', '!src/app/css/skins.scss', '!src/app/css/variables.scss']
	},
	appPrefixFile: 'app.prefix',
	appSuffixFile: 'app.suffix',
	appScriptResultFile: 'app.js',
	appStyleResultFile: 'style.css',
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
		'bower_components/**/*angular.js',
		'bower_components/**/*angular-resource.js',
		'bower_components/**/*angular-route.js',
		'bower_components/**/*jquery.js',
		'bower_components/**/*modernizr.js',
		'bower_components/**/*foundation-icons*',
		'bower_components/**/*foundation.js',
		'bower_components/**/*foundation.css',
		'!bower_components/**/*scss',
		'!bower_components/**/*gzip',
		'!bower_components/**/*.min*']
};