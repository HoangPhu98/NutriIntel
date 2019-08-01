const Sequelize = require('sequelize')
const db = require('../config/database')

const Food = db.define('foods', {
    nameVi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }, nameEn: {
        type: Sequelize.STRING,
    }, description: {
        type: Sequelize.TEXT
    }, image: {
        type: Sequelize.STRING
    }
});

module.exports = Food;