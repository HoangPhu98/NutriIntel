import { FLOAT } from 'sequelize';
import { define } from '../config/database';
import Diet, { belongsToMany } from './diet.model.pg';
import Nutrient, { belongsToMany as _belongsToMany } from './nutrient.model.pg';

const DietNutrient = define('diet_nutrients', {
    // diedId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    // nutrientId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    upperBound: {
        type: FLOAT,
        allowNull: false
    },
    lowerBound: {
        type: FLOAT,
        allowNull: false
    }
})

belongsToMany(Nutrient, {as: 'nutrients', through: DietNutrient, foreignKey: 'dietId', onDelete: 'RESTRICT'})
_belongsToMany(Diet, {through: DietNutrient, foreignKey: 'nutrientId', onDelete: 'RESTRICT'})


export default DietNutrient