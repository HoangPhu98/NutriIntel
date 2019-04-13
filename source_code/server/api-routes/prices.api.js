const express = require("express")
const Router = express.Router()
const PriceController = require("../controller/prices.controller")

Router.post('/create', PriceController.create)

module.exports = Router;