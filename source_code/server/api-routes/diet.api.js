const express = require('express');
const DietController = require('../controllers/diet.controller')

const Router = express.Router();


Router.get('/all', DietController.getAll);


module.exports = Router;