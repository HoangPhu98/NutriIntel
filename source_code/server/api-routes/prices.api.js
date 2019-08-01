const express = require("express")
const Router = express.Router()
const PriceController = require("../helpers/prices.helper")

Router.post('/create', PriceController.create)

module.exports = Router;