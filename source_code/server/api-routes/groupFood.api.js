const express = require('express')
const Router = express.Router()
const GroupFoodController = require('../controllers/group.controller')
const validation = require('./validation/groupFood.validation')

Router.post('/create', validation.createGroup, GroupFoodController.create)
Router.post('/import', GroupFoodController.importData)
Router.get('/all', GroupFoodController.getAll)
Router.put('/:id', validation.updateGroup, GroupFoodController.update)
Router.delete('/:id', validation.onlyGroupId, GroupFoodController.deleteOne)

module.exports = Router