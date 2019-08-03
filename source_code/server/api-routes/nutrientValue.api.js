'use strict';

var express = require('express');
var Router = express.Router();
var nutrientValueContoller = require('../controllers/nutrientValue.controller');
var nux = require('../helpers/nutrientValue.helper');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var validations = require('./validation/nutrientValue.validation');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

Router.post('/', validations.createNutrient, nutrientValueContoller.createNutrient);
Router.get('/all', nutrientValueContoller.getAllNutrient);
Router.post('/updateOne', nux.updateOne);
Router.post('/deleteOne', nux.deleteOne);
Router.post('/importData', upload.single('fileName'), nux.importData);

module.exports = Router;