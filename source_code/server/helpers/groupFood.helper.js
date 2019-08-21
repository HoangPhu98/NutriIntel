const Group = require('../model/group.model.pg')
const db = require('../config/database')

const create = async (group) => {
    let err = undefined
    let createdGroup = undefined

    try {
        createdGroup = await Group.create({
            code: group.code,
            name: group.name,
            description: group.description
        })
    } catch (err) {
        err = err;
    }
    db.close();
    return {createdGroup, err}
}

const createMulti = async (groups) => {
    let createdGroups = undefined
    let err = undefined

    try {
        createdGroups = await Group.bulkCreate(groups, {returning: true}).then()
    } catch (err) {
        err = err
    }

    db.close()
    return {err, createdGroups}
}

const update = async (id, info) => {
    let err = undefined
    try {
        let group = await Group.findByPk(id)
        if(group == null) {
            err = new Error('not exist group id')
        } else {
            let ok = group.update(info)
            if(!ok) {
                err = new Error('happen interupt when update group')
            }
        }
    } catch(err) {
        err = err
    }
    return {err}
}

const deleteOne = async (id) => {
    let err = undefined
    try {
        let group = await Group.findByPk(id)
        if(group == null) {
            err = new Error('not exist group id')
        } else {
            let ok = group.destroy({force: true})
            if(!ok) {
                err = new Error('happen interupt when delete group')
            }
        }
    } catch(err) {
        err = err
    }
    
    return {err}
}

const retrieveAll = async () => {
    let err = undefined
    let groups = undefined

    try {
        groups = await Group.findAll()
    } catch(err) {
        err = err
    }

    return {err, groups}
}

module.exports = {
    create,
    createMulti,
    retrieveAll,
    update,
    deleteOne,
}