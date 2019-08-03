import { FLOAT } from 'sequelize';
import { define } from '../config/database';
import Nutrient, { belongsToMany } from './nutrient.model.pg';
import Food, { belongsToMany as _belongsToMany } from './food.model.pg';


const FoodNutrient = define('food_nutrients', {
    value: {
        type: FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    }, amount: {
        type: FLOAT,
        allowNull: false,
        defaultValue: 100,
        validate: {
            min: 0
        }
    }
})

_belongsToMany(Nutrient, {as: 'nutrients', through: FoodNutrient, foreignKey: 'foodId', onDelete: 'RESTRICT'})
belongsToMany(Food, {through: FoodNutrient, foreignKey: 'nutrientId', onDelete: 'RESTRICT'})

export default FoodNutrient