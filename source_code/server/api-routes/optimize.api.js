"use strict";

var express = require("express");
var Router = express.Router();
var OptimizeController = require("../helpers/optimize.helper");

Router.post('/', OptimizeController.requestOpt);

module.exports = Router;