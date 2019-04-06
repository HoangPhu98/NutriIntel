const express = require("express")
const Router = express.Router()
const OptimizeController = require("../controller/optimize.controller")

Router.get('/', OptimizeController.requestOpt)

module.exports = Router;