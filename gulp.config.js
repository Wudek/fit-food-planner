module.exports = {
	buildDirectory : 'build',
	libDirectory : 'build/lib',
	appFiles : {
		js: ['src/app/**/*.js','!src/app/**/*.spec.js'],
		jsunit: [],
		jade:['src/app/index.jade'],
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
	libFiles : {
		js_prefix: 'bower_components/**',
		js: ['angular.min.js',
			'angular.min.js.map',
			'angular-resource.min.js',
			'angular-resource.min.js.map',
			'angular-route.min.js',
			'angular-route.min.js.map',
			'jquery.min.js',
			'jquery.min.map',
			'modernizr.js'],
		css: [],
		assets: []
	}
};