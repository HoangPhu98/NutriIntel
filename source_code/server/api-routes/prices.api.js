"use strict";

var express = require("express");
var Router = express.Router();
var PriceController = require("../helpers/prices.helper");

Router.post('/create', PriceController.create);

module.exports = Router;