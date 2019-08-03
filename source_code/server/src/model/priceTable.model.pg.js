import { BIGINT } from "sequelize/types";
import Food from "./food.model.pg";

const PriceTable = define('price_tables', {
    price: {
        type: BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});
Food.hasOne(PriceTable, {as: 'priceTable', foreignKey: 'priceTableId'})

export default PriceTable;