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
//var gutil = require('gulp-util');

gulp.task('default', function(){
});

gulp.task('helloWorld', function(){
	console.log('hello world!');
});
