'use strict';

var express = require('express');
var DietController = require('../controllers/diet.controller');

var Router = express.Router();

Router.get('/all', DietController.getAll);

module.exports = Router;