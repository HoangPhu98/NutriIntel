const {check} = require('express-validator')

module.exports = {
    createNutrient: [
        check("unitCode").isString().exists(),
        check("code").isString().exists(),
        check("nameVi").isString().exists(),
        check("nameEn").isString().exists(),
        check("description").isString().optional()
    ],
    removeNutrient: [check("id").isNumeric().exists()],
    updateNutrient: [
        check("unitCode").isString().optional(),
        check("code").isString().optional(),
        check("nameVi").isString().optional(),
        check("nameEn").isString().optional(),
        check("description").isString().optional(),
        check('id').isNumeric().exists()
    ]

}