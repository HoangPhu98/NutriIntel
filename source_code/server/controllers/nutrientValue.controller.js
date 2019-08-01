const { check, validationResult } = require('express-validator');
const nutrientValueHelper = require('../helpers/nutrientValue.helper');

/**
* @api {post} /api/user Create user
* @apiName Create new user
* @apiPermission admin
* @apiGroup User
*
* @apiParam  {model.NutrientValue} body
*
* @apiSuccess (200) {Object} GeneralResponse
*/

const createNutrient = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    nutrientValueHelper.create(req.body).then((result) => {
        if(result.err) {
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


const getAllNutrient = (req, res) => {
    nutrientValueHelper.searchAll().then(result => {
        if(result.err) {
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
    createNutrient,
    getAllNutrient
}