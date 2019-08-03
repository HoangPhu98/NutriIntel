const Diet = require('../model/diet.model.pg').default.default

const findAll = async () => {
    try {
        const diets = await Diet.findAll()
        return {err: undefined, data: diets}
    } catch(err) {
        return {err, data: undefined}
    }
}

module.exports = {
    findAll,
}