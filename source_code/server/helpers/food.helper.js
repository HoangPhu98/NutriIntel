const Food = require('../model/food.model.pg')
const Nutrient = require('../model/nutrient.model.pg')
const db = require('../config/database')
const FoodNutrient = require('../model/foodNutrient.model.pg')

const create = async (food) => {
    let err = undefined
    let createdFood = undefined;

    try {
        createdFood = await Food.create(food)
    } catch(err) {
        err = err
    }

    db.close()
    return {err, createdFood}
}

const update = async (id, info) => {
    let err = undefined
    try {
        const food = await Food.findByPk(id)
        if(food == null) {
            err = new Error('not exist nutrient id')
        } else {
            let ok = food.update(food)
            if(!ok) {
                err = new Error('haapen interupt when update food')
            }
        }
    } catch(err) {
        err = err;
    }
    return {err}
}

const deleteOne = async (id) => {

}

const retrieveByID = async () => {
    let err = undefined
    let food = undefined

    try {
        food = await Food.findByPk(id)
    } catch(err) {
        err = err
    }
    return {err, food}
}

const filter = async (pageSize, pageNo) => {

}

const createMulti = async (foods) => {
    let createdFoods = undefined
    let err = undefined
    
    try {
        nutrients = await Nutrient.findAll()

        createdFoods = await Food.bulkCreate(foods, {returning: true, include: Nutrient}).then()
        await createdFoods.map((food, index) => {
            foods[index].nutrients.map((nutrient, index) => {
                let nu = nutrients.filter(nut => nut.code == nutrient.nutrientCode)
                food.addNutrient(nu[0], {through: {
                    amount: nutrient.amount,
                    value: nutrient.value
                }})
            })
        })

        Sequelize.sync()
    } catch(err) {
        err = err;
    }
  
    // db.close();
    return {err, createdFoods}
}

module.exports = {
    create,
    createMulti,
    update,
    retrieveByID,
    filter,
    deleteOne,
}