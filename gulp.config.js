module.exports = {
	buildDirectory : 'build',
	libDirectory : 'build/lib',
	viewsDirectory : 'build/views',
	appFiles : {
		js: ['src/app/**/*.js','!src/app/**/*.spec.js'],
		jsunit: [],
		jade:['src/app/**/*.jade'],
		sass:['src/app/**/*.scss', '!src/app/css/colors.scss', '!src/app/css/links.scss', '!src/app/css/skins.scss', '!src/app/css/variables.scss']
	},
	appPrefixFile: 'app.prefix',
	appSuffixFile: 'app.suffix',
	appScriptResultFile: 'app.js',
	appStyleResultFile: 'style.css',
	serverFiles : {
		js: ['src/server/**/*.js','!src/server/**/*.spec.js'],
		jsunit: []
	},
	testFiles : {
		js: []
	},
	vendorFiles : ['vendor/**/*.js','vendor/**/*.css','vendor/**/*.eot','vendor/**/*.svg','vendor/**/*.ttf','vendor/**/*.woff'],
	bowerFile : ['bower.json'],
	bowerFiles :  ['bower_components/**/*angular.min.js',
			'bower_components/**/*angular.min.js.map',
			'bower_components/**/*angular-resource.min.js',
			'bower_components/**/*angular-resource.min.js.map',
			'bower_components/**/*angular-route.min.js',
			'bower_components/**/*angular-route.min.js.map',
			'bower_components/**/*jquery.min.js',
			'bower_components/**/*jquery.min.map',
			'bower_components/**/*modernizr.js']
};