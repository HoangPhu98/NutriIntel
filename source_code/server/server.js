const express = require('express');
const logger = require('morgan');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');


const nutrientValueAPI = require('./api-routes/nutrientValue.api')
const optimizeAPI = require("./api-routes/optimize.api")
const unitAPI = require('./api-routes/unit.api')


const app = express();

app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
app.use(logger('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var connectionString = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name;
mongoose.connect(connectionString, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log("Mongoose default connection is open to " + connectionString);
})


app.get('/', (req, res) => {
    return res.json({
        status: 200
    })
});

app.use('/nutrientValue', nutrientValueAPI);
app.use('/optimize', optimizeAPI);
app.use('/unit', unitAPI)

app.listen(config.app.port, () => console.log('Server running at port: ' + config.app.port));