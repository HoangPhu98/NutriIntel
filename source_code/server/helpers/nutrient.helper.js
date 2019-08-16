var Nutrient = require('../model/nutrient.model.pg');
var db = require('../config/database');


const create = async (data) => {
    let err = undefined;
    let returnValue = undefined;

    try {
        let createdNutrient = await Nutrient.create({
            nameVi: data.nameVi,
            nameEn: data.nameEn,
            description: data.description
        });
        returnValue = createdNutrient;
    } catch(err) {
        err = err;
    }
    db.close();
    return {returnValue, err};
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
        nutrients = await Nutrient.findAll();
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

const createMulti = async () => {

}

module.exports = {
    create,
    update,
    remove,
    retrieve,
    createMulti
}