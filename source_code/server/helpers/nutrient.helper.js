var Nutrient = require('../model/nutrient.model.pg');
var db = require('../config/database');
const Unit = require('../model/unit.model.pg')

const create = async (data) => {
    let err = undefined;
    let createdNutrient = undefined;

    try {
        createdNutrient = await Nutrient.create({
            code: data.code,
            nameVi: data.nameVi,
            nameEn: data.nameEn,
            description: data.description,
            unitCode: data.unitCode
        });
    } catch(err) {
        err = err;
    }
    db.close();
    return {createdNutrient, err};
}

const update = async (id, data) => {
    let err = undefined;
    try {
        const nutrient = await Nutrient.findByPk(id);
        if(nutrient == null) {
            err = new Error('not exist nutrient id')
        } else {
            let ok = nutrient.update(data);
            if(!ok) {
                err = new Error('happen interupt when update nutrient')
            }
        }
    } catch(err) {
        err = err;
    }
    return {err}
}   

const retrieve = async () => {
    let err = undefined;
    let nutrients = undefined;

    try {
        nutrients = await Nutrient.findAll({include: [Unit]});
    } catch(err) {
        err = err
    }

    return {err, nutrients}
}

const remove = async (id) => {
    let err = undefined;
    try {
        const nutrient = await Nutrient.findByPk(id);
        if(nutrient == null) {
            err = new Error('not exist nutrient id')
        } else {
            let ok = nutrient.destroy({force: true});
            if(!ok) {
                err = new Error('happen interupt when delete nutrient')
            }
        }
    } catch(err) {
        err = err;
    }
    return {err}
}

const createMulti = async (nutrients) => {
    let err = undefined
    let createdNutrients = undefined

    try {
        createdNutrients = await Nutrient.bulkCreate(nutrients, {returning: true}).then()
    } catch (e) {
        // should be passed return back controller and show in response
        console.log(e)

    }

    return {err, createdNutrients}
}

module.exports = {
    create,
    update,
    remove,
    retrieve,
    createMulti
}