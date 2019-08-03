'use strict';

var mongoose = require('mongoose');
var config = require('./config');

var _config$db = config.db,
    host = _config$db.host,
    port = _config$db.port,
    name = _config$db.name;


var connectionString = 'mongodb://${host}:${port}/${name}';
mongoose.connect(connectionString);