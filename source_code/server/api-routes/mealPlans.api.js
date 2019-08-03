'use strict';

var express = require('express');
var Router = express.Router();
var mealPlanController = require('../helpers/mealPans.helper');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

Router.post('/', mealPlanController.create);
Router.get('/all', mealPlanController.searchAll);
Router.post('/updateOne', mealPlanController.updateOne);
Router.post('deleteOne', mealPlanController.deleteOne);
Router.post('/importData', upload.single('fileName'), mealPlanController.importData);

module.exports = Router;