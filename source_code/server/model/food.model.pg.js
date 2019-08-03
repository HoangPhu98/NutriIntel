var Sequelize = require('sequelize');
var db = require('../config/database');

var Food = db.define('foods', {
    nameVi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }, nameEn: {
        type: Sequelize.STRING
    }, description: {
        type: Sequelize.TEXT
    }, image: {
        type: Sequelize.STRING
    }
});

module.exports = Food;