/*
 https://github.com/gulpjs/gulp
 To install:
 npm install -g gulp
 npm install --save-dev gulp gulp-util

 To run:
 open cmd line at project root and run 'gulp <task> <othertask>'

 ex: gulp helloWorld
 */
'use strict';

var gulp = require('gulp');
var util = require('util');
var gutil = require('gulp-util');
var fs = require('fs');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var bower = require('gulp-bower');
var flatten = require('gulp-flatten');
var traceur = require('gulp-traceur');
var frep = require('gulp-frep');
var refresh = require('gulp-livereload');
var plumber = require('gulp-plumber');
var _ = require('lodash');
var S = require('string');
var moment = require('moment');

var config = require('./gulp.config.js');

var frepUseStrictPattern = {pattern: '"use strict";', replacement: ''};
var frepModuleNamePattern = {pattern: 'var\\s__moduleName\\s=\\s\\"\\w*\\";', replacement: ''};
var frepRemoveComments = {pattern: '\/\/[|\\w\\(\\=\'\\,\\-\\)\\%\t ]*', replacement: ''};

var liveReloadServer = require('tiny-lr')();
liveReloadServer.listen(35729, function(err){
	if(err) return console.log(err);
});

var watchEnabled = false;

function preWatch(){
	if(watchEnabled)
	{
		util.print('\u001b[2J\u001b[0;0H'); //Clear console
		gutil.log('Watch running (' +  moment().format('hh:mm:ss A') + ')');
	}
}

function getTraceur(){
	return traceur();
//	return traceur({wrap:'false'});
}

gulp.task('clean', function(){
	return gulp.src([config.buildDirectory, config.libDirectory], {read: false})
		.pipe(clean());
});

gulp.task('dataScripts', function(){
	preWatch();
	return gulp.src(config.appDataFiles)
		.pipe(plumber())
		.pipe(concat(config.appDataOutputFile))
		.pipe(getTraceur())
		.pipe(frep([frepUseStrictPattern,frepModuleNamePattern]))
		.pipe(gulp.dest(config.buildDirectory))
});

gulp.task('appScriptsCompile', ['dataScripts'], function(){
	var prefix = fs.readFileSync(config.appPrefixFile, 'utf8');
	var suffix = fs.readFileSync(config.appSuffixFile, 'utf8');
	return gulp.src(config.appFiles.js)
		.pipe(plumber())
		.pipe(concat(config.appScriptOutputFile))
		.pipe(getTraceur())
		.pipe(frep([frepModuleNamePattern]))
		.pipe(header(prefix))
		.pipe(footer(suffix))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
//		.pipe(uglify())
		.pipe(gulp.dest(config.buildDirectory))
		.pipe(refresh(liveReloadServer));
});

gulp.task('appScripts', ['appScriptsCompile'], function(){
	return gulp.src(config.appDataOutputFilePath, {read: false})
		.pipe(clean());
});

gulp.task('styles', function(){
	preWatch();
	return gulp.src(config.appFiles.sass)
		.pipe(plumber())
		.pipe(sass({errLogToConsole: true}))
		.pipe(concat(config.appStyleOutputFile))
//		.pipe(minifyCSS())
		.pipe(gulp.dest(config.buildDirectory))
		.pipe(refresh(liveReloadServer));
});

gulp.task('views', function(){
	preWatch();
	return gulp.src(config.appFiles.jade)
		.pipe(plumber())
		.pipe(flatten())
//		.pipe(frep([frepRemoveComments]))
		.pipe(gulp.dest(config.viewsDirectory))
		.pipe(refresh(liveReloadServer));
});


gulp.task('additional_lib', function(){
	return gulp.src(config.additionalLibFiles)
		.pipe(plumber())
		.pipe(flatten())
		.pipe(gulp.dest(config.libDirectory))
});

gulp.task('bower', function(){
	return bower();
});

gulp.task('vendor_merge', ['bower'], function(){
	return gulp.src(config.bowerFiles_dev)
		.pipe(plumber())
		.pipe(flatten())
		.pipe(gulp.dest(config.libDirectory))
});

gulp.task('vendor', ['vendor_merge'], function(){
//	return gulp.src('bower_components', {read: false})
//		.pipe(clean());
});

gulp.task('watch', ['vendor'], function(){
	watchEnabled = true;
	gulp.watch([config.appFiles.js, config.appDataFiles], ['appScripts']);
	gulp.watch(config.appFiles.sass, ['styles']);
	gulp.watch(config.appFiles.jade, ['views']);
});

gulp.task('default', ['clean'], function(){
	gulp.start('vendor', 'appScripts', 'styles', 'views', 'additional_lib', 'watch');
});

gulp.task('default2', ['clean'], function(){
	//No post cleanup and no watching
	gulp.start('vendor_merge', 'appScripts', 'styles', 'views', 'additional_lib');
});

