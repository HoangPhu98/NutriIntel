const express = require('express')
const Router = express.Router()
const UnitController = require('../controller/units.Controller')

Router.get('/', UnitController.searchAll)

module.exports = Router