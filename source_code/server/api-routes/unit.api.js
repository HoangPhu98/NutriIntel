const express = require('express');
const Router = express.Router();
var UnitController = require('../helpers/units.helper');

const unitController = require('../controllers/unit.controller');
const validation = require('./validation/unit.validation')

Router.get('/', UnitController.searchAll);

Router.post('/create', validation.createUnit, unitController.create);
Router.get('/all', unitController.getAll);
Router.get('/:id', validation.onlyUnitId, unitController.getById);
Router.put('/:id', validation.updateUnit, unitController.update);
Router.delete('/:id', validation.onlyUnitId, unitController.removeById);
Router.post('/import', unitController.importData);

module.exports = Router;