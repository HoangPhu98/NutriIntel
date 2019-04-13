const express = require('express')
const Router = express.Router()
const mealPlanController = require('../controller/mealPans.controller')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

Router.post('/', mealPlanController.create)
Router.get('/all', mealPlanController.searchAll)
Router.post('/updateOne', mealPlanController.updateOne)
Router.post('deleteOne', mealPlanController.deleteOne)
Router.post('/importData', upload.single('fileName'), mealPlanController.importData)

module.exports = Router
