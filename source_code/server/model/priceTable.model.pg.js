var Sequelize = require("sequelize");
var db = require('../config/database')
var FoodModel = require("./food.model.pg");

var PriceTable = db.define('price_tables', {
    price: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

FoodModel.hasOne(PriceTable, { as: 'priceTable', foreignKey: 'priceTableId' });

module.exports = PriceTable;