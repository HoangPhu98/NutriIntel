const {check} = require('express-validator')

module.exports = {
    createNutrient: [
        check("nameVi").isString().exists(),
        check("nameEn").isString().exists(),
        check("description").isString().optional()
    ],
    removeNutrient: [check("id").isNumeric().exists()],
    updateNutrient: [
        check("nameVi").isString().optional(),
        check("nameEn").isString().optional(),
        check("description").isString().optional(),
        check('id').isNumeric().exists()
    ]

}