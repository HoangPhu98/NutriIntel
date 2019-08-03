const express = require('express');
const logger = require('morgan');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');


const db = require('./config/database')

const DietModel = require('./model/diet.model.pg')
const FoodModel = require('./model/food.model.pg')
const NutrientModel = require('./model/nutrient.model.pg')
const FoodNutrientModel = require('./model/foodNutrient.model.pg')
const UnitModel = require('./model/unit.model.pg')
const DietNutrientModel = require('./model/dietNutrient.model.pg')

const nutrientValueAPI = require('./api-routes/nutrientValue.api')
const optimizeAPI = require("./api-routes/optimize.api")
const unitAPI = require('./api-routes/unit.api')
const mealPlanAPI = require('./api-routes/mealPlans.api')
const priceAPI = require('./api-routes/prices.api')
const DietAPI = require('./api-routes/diet.api')

const app = express()

app.use(bodyParse.urlencoded({extended: true}))
app.use(bodyParse.json())
app.use(logger('dev'))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

var connectionString = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name
mongoose.connect(connectionString, {useNewUrlParser: true})
mongoose.Promise = global.Promise

db.authenticate()
    .then(() => {
        UnitModel.sync();
        DietModel.sync();
        FoodModel.sync();
        NutrientModel.sync();
        FoodNutrientModel.sync();
        DietNutrientModel.sync();
        console.log('Database connected...')
    })
    .catch(err => console.error('Error: ' + err))



app.get('/', (req, res) => {
    return res.json({
        status: 200
    })
});

app.use('/nutrientValue', nutrientValueAPI)
app.use('/optimize', optimizeAPI)
app.use('/unit', unitAPI)
app.use('/mealPlan', mealPlanAPI)
app.use('/price', priceAPI)
app.use('/diet', DietAPI)

app.listen(config.app.port, () => console.log('Server running at port: ' + config.app.port))