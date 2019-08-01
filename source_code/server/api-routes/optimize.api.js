const express = require("express")
const Router = express.Router()
const OptimizeController = require("../helpers/optimize.helper")

Router.post('/', OptimizeController.requestOpt)

module.exports = Router;