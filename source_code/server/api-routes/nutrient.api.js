const express = require('express');
const Router = express.Router();

const nutrientController = require('../controllers/nutrient.controller');
const validations = require('./validation/nutrient.validation');

Router.post('/create', validations.createNutrient, nutrientController.create);
Router.get('/all', nutrientController.getAll);
Router.delete('/:id', validations.removeNutrient, nutrientController.removeById);
Router.put('/:id', validations.updateNutrient, nutrientController.update);
Router.post('/import', nutrientController.importData);


module.exports = Router;
