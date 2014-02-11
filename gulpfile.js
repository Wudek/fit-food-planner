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
var flatten = require('gulp-flatten');
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

gulp.task('styles', function(){
	gulp.src(config.appFiles.sass)
		.pipe(sass())
		.pipe(concat(config.appStyleResultFile))
//		.pipe(minifyCSS())
		.pipe(gulp.dest(config.buildDirectory));
});

gulp.task('views', function(){

	gulp.src(config.appFiles.jade)
		.pipe(flatten())
		.pipe(gulp.dest(config.viewsDirectory));
});

gulp.task('bower', function(){
	return bower();
});

gulp.task('vendor_combine', ['bower'], function(){
	return gulp.src(_.union(config.bowerFiles, config.vendorFiles))
		.pipe(flatten())
		.pipe(gulp.dest(config.libDirectory));
});

gulp.task('vendor', ['vendor_combine'], function(){
	return gulp.src('bower_components', {read: false})
		.pipe(clean());
});

gulp.task('watch', ['vendor'], function(){
	gulp.watch(config.appFiles.js, ['appScripts']);
	gulp.watch(config.appFiles.sass, ['styles']);
	gulp.watch(config.appFiles.jade, ['views']);
});

gulp.task('default', ['clean'], function(){
	gulp.start('vendor', 'appScripts', 'styles', 'views', 'watch');
});

