const express = require('express');
const Router = express.Router();
const nutrientValueContoller = require('../controllers/nutrientValue.controller');
const nux = require('../helpers/nutrientValue.helper')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const validations = require('./validation/nutrientValue.validation');

const { check, validationResult } = require('express-validator');


Router.post('/' , validations.createNutrient, nutrientValueContoller.createNutrient);
Router.get('/all', nutrientValueContoller.getAllNutrient);
Router.post('/updateOne', nux.updateOne);
Router.post('/deleteOne', nux.deleteOne);
Router.post('/importData', upload.single('fileName'), nux.importData);

module.exports = Router;