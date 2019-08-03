import { STRING, TEXT } from 'sequelize';
import { define } from '../config/database';

const Diet = define('diets', {
    nameVi: {
        type: STRING,
        allowNull: false
    }, nameEn: {
        type: STRING
    }, description: {
        type: TEXT
    }, image: {
        type: STRING
    }
}, {
    freezeTableName: true,
})

export default Diet