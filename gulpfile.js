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
var fs = require('fs');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var jade = require('gulp-jade');
var bower = require('gulp-bower');
var _ = require('lodash');

var config = require('./gulp.config.js');

gulp.task('clean', function(){
	return gulp.src([config.buildDirectory, config.libDirectory], {read: false})
		.pipe(clean());
});

gulp.task('appScripts', function(){
	var prefix = fs.readFileSync(config.appPrefixFile, 'utf8');
	var suffix = fs.readFileSync(config.appSuffixFile, 'utf8');
	gulp.src(config.appFiles.js)
		.pipe(concat(config.appScriptResultFile))
//		.pipe(uglify())
		.pipe(header(prefix))
		.pipe(footer(suffix))
		.pipe(gulp.dest(config.buildDirectory))
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('appStyles', function(){
	gulp.src(config.appFiles.sass)
		.pipe(sass())
		.pipe(concat(config.appStyleResultFile))
//		.pipe(minifyCSS())
		.pipe(gulp.dest(config.buildDirectory));
});

gulp.task('appJade', function(){

	gulp.src(config.appFiles.jade)
//		.pipe(jade())
		.pipe(jade({pretty:true}))
		.pipe(gulp.dest(config.buildDirectory));
});

gulp.task('vendor_get', function(){
	return bower();
});

gulp.task('vendor_combine', ['vendor_get'], function(){
	var prefix = config.libFiles.js_prefix;
	var concatFiles = _(config.libFiles.js).map(
		function(file){
			console.log(prefix + file);
			return prefix + file;
		}
	);

	console.log(concatFiles);
	var srcFiles = ['bower_components/**/*.min.js', 'bower_components/**/*.min.js.map', '!**jquery-migrate*', 'bower_components/**/modernizr.js', '!**test*'];
	return gulp.src(srcFiles).
		pipe(gulp.dest(config.libDirectory));
});

gulp.task('vendor_clean', ['vendor_combine'], function(){
	return gulp.src('bower_components', {read: false})
		.pipe(clean());
});

gulp.task('watch', function(){
//	gulp.watch(config.appFiles.js, ['appScripts']);
//	gulp.watch(config.appFiles.sass, ['appStyles']);
//	gulp.watch(config.appFiles.jade, ['appJade']);
});

gulp.task('default', ['clean'], function(){
	gulp.start('vendor_get', 'vendor_combine', 'appScripts', 'appStyles', 'appJade', 'watch');
});

