const express = require('express')
const Router = express.Router()
const FoodController = require('../controllers/food.controller')

Router.post('/import', FoodController.importData)

module.exports = Router