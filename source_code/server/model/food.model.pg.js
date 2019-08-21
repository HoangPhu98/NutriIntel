var Sequelize = require('sequelize');
var db = require('../config/database');
const GroupModel = require('./group.model.pg')

var Food = db.define('foods', {
    foodCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
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

Food.belongsTo(GroupModel, {foreignKey: 'groupCode', targetKey: 'code'})

module.exports = Food;