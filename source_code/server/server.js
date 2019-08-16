const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

var config = require('./config');
var db = require('./config/database');

var DietModel = require('./model/diet.model.pg');
var FoodModel = require('./model/food.model.pg');
var NutrientModel = require('./model/nutrient.model.pg');
var FoodNutrientModel = require('./model/foodNutrient.model.pg');
var UnitModel = require('./model/unit.model.pg');
var DietNutrientModel = require('./model/dietNutrient.model.pg');
var PriceTableModel = require('./model/priceTable.model.pg');

const NutrientAPI = require('./api-routes/nutrient.api');

var NutrientValueAPI = require('./api-routes/nutrientValue.api');
var OptimizeAPI = require('./api-routes/optimize.api');
var UnitAPI = require('./api-routes/unit.api');
var MealPlansAPI = require('./api-routes/mealPlans.api');
var PricesAPI = require('./api-routes/prices.api');
var DietAPI = require('./api-routes/diet.api');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(fileUpload());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var connectionString = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name;
mongoose.connect(connectionString, { useNewUrlParser: true });
Promise = global.Promise

db.authenticate().then(function () {
    // UnitModel.sync();
    // NutrientModel.sync();
    // DietModel.sync();
    // FoodModel.sync();
    // FoodNutrientModel.sync();
    // DietNutrientModel.sync();
    // PriceTableModel.sync();
    console.log('___________________Database connected______________________');
}).catch(function (err) {
    return console.error('Error: ' + err);
});


app.use('/nutrient', NutrientAPI);

app.use('/nutrientValue', NutrientValueAPI);
app.use('/optimize', OptimizeAPI);
app.use('/unit', UnitAPI);
app.use('/mealPlan', MealPlansAPI);
app.use('/price', PricesAPI);
app.use('/diet', DietAPI);

app.get('/', (req, res) => res.send('Hello World!'))

const port = config.app.port;
app.listen(port, () => console.log('Server running at port: ' + port));