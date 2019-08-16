var Unit = require('../model/unit.model.pg');
var db = require('../config/database')

const create = async (data) => {
    let err = undefined;
    let returnValue = undefined;
    try {
        createdUnit = await Unit.create({
            nameVi: data.nameVi,
            nameEn: data.nameEn,
            notation: data.notaion,
            note: data.note
        });
        returnValue = createdUnit;
    } catch(err) {
        err = err;
    }
    db.close();
    return {returnValue, err};
}

const update = async (id, data) => {
    let err = undefined
    try {
        const unit = await Unit.findByPk(id);
        if(unit == null) {
            err = new Error('not exist unit id');
        } else {
            let ok = unit.update(data);
            if(!ok) {
                err = new Error('hapen interupt when update unit');
            }
        }
    } catch(err) {
        err = err;
    }
    return {err};
}

const retrieveAll = async () => {
    let err = undefined;
    let units = undefined;
    try {
        units = await Unit.findAll();
    } catch (err) {
        err = err; 
    }
    return {err, units};
}

const retrieveOne = async (id) => {
    let err = undefined;
    let unit = undefined;
    try {
        unit = await Unit.findByPk(id);
        if(unit === null) {
            err = new Error('not found unit by that id');
        }
    } catch (err) {
        err = err;
    }
    return {unit, err}
}

const remove = async (id) => {
    let err = undefined;
    try {
        unit = await Unit.findByPk(id);
        if(unit == null) {
            err = new Error('not exist unit id');
        } else {
            let ok = unit.destroy({force: true});
            if(!ok) {
                err = new Error('hapen interupt when delete unit');
            }
        }
    } catch(err) {
        err = err;
    }
    return {err}
}

const createMulti = async (units) => {
    let createdUnits = undefined;
    let err = undefined;

    try {
        let returnValue = await Unit.bulkCreate(units, { returning: true }).then();
        createdUnits = returnValue;
    } catch(err) {
        err = err;
    }
    db.close();
    return {err, createdUnits};
}

module.exports = {
    create,
    createMulti,
    update,
    remove,
    retrieveAll,
    retrieveOne,
}