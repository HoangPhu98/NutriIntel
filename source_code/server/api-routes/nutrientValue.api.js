const express = require('express');
const Router = express.Router();
const nutrientValueContoller = require('../controller/nutrientValue.controller');

Router.post('/', nutrientValueContoller.create);
Router.get('/all', nutrientValueContoller.searchAll);
Router.post('/updateOne', nutrientValueContoller.updateOne);
Router.delete('/deleteOne', nutrientValueContoller.deleteOne);

module.exports = Router;