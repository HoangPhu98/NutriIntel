'use strict';

var express = require('express');
var Router = express.Router();
var UnitController = require('../helpers/units.helper');

Router.get('/', UnitController.searchAll);

module.exports = Router;