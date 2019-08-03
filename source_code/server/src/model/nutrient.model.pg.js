import { Sequelize as _Sequelize, STRING } from 'sequelize';
import { define } from '../config/database';
import Unit from './unit.model.pg';

const Nutrient = define('nutrients', {
    nameVi: {
        type: _Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }, nameEn: {
        type: STRING
    }, scientName: {
        type: STRING
    }, description: {
        type: STRING
    }, 
});

Nutrient.hasOne(Unit, {as: 'unit', foreignKey: 'unitId'})
export default Nutrient;