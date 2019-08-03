import { STRING, TEXT } from 'sequelize';
import { define } from '../config/database';

const Food = define('foods', {
    nameVi: {
        type: STRING,
        allowNull: false,
        unique: true
    }, nameEn: {
        type: STRING,
    }, description: {
        type: TEXT
    }, image: {
        type: STRING
    }
});

export default Food;