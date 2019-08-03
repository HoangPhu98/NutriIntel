
const DietHelper = require('../helpers/diet.helper')

const getAll = (req, res) => {
    DietHelper.findAll().then(result => {
        
        if(result.err) {
            console.error("Have problem at diet controller: " + result.err)
            res.json({success: false, data: undefined, message: "not ok"})
        } else {
            res.json({
                success: true,
                data: result.data,
                message: "ok"
            })
        }
    })
}

module.exports = {
    getAll,
}