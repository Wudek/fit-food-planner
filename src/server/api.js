'use strict';

var clientController = require('db/clientController');
var foodController = require('db/FoodController');
var logger = require('./logger');
var Promise = require('bluebird');

exports.list = function(req, res){
  res.send('respond with a resource');
};