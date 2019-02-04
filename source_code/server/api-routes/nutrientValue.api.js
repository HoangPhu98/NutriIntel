const express = require('express');
const Router = express.Router();
const nutrientValueContoller = require('../controller/nutrientValue.controller');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

Router.post('/', nutrientValueContoller.create);
Router.get('/all', nutrientValueContoller.searchAll);
Router.post('/updateOne', nutrientValueContoller.updateOne);
Router.post('/deleteOne', nutrientValueContoller.deleteOne);
Router.post('/importData', upload.single('fileName'), nutrientValueContoller.importData);

module.exports = Router;